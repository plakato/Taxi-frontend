import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, Car } from './order.module';
import { tap, map } from 'rxjs/operators';
import { Constants } from '../../assets/const';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit {
  public newOrder: Order;
  private currentOrderData: Order;  
  public currentOrder: BehaviorSubject<Order> = new BehaviorSubject(this.currentOrderData);
  private interval;

  constructor(private http: HttpClient,
              private router: Router) {this.clearCache();
    window.addEventListener('beforeunload', () => {this.cacheOrder();});    
    let newO = localStorage.getItem('newOrder');
    if (newO != 'undefined' && newO !== 'null') {
      this.newOrder = JSON.parse(newO);
    } else {
      this.newOrder = {} as any;
    }
    let currentO = localStorage.getItem('currentOrder');
    if (currentO != 'undefined' && currentO != 'null') {
      this.currentOrderData = JSON.parse(currentO);
      this.currentOrder.next(this.currentOrderData);
    }

    if (this.currentOrderData != null) {
      this.startWatchingOrder(this.currentOrderData.id);
      }
      this.cacheOrder();
   }

  ngOnInit() {
   // localStorage.setItem('newOrder', JSON.stringify(this.newOrder));

  }

  initializeOrder() {
    this.newOrder = {} as any;
  }

  cacheOrder() {
    localStorage.setItem('newOrder', JSON.stringify(this.newOrder));
    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrderData));    
  }

  sendNewOrder() {
    const This = this;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<Order>('orders', JSON.stringify(
      {
        order: {
          customer_telephone: this.newOrder.phone == null ? this.newOrder.contact_phone : this.newOrder.phone,
          driver_id: this.newOrder.driverID,
          loc_start: {
            lat: this.newOrder.loc_start.lat,
            lng: this.newOrder.loc_start.lng
          },
          loc_finish: (this.newOrder.loc_finish == null) ? null : {
            lat: this.newOrder.loc_finish.lat,
            lng: this.newOrder.loc_finish.lng
          },
          passenger_count: this.newOrder.passenger_count,
          note: this.newOrder.note,
          contact_telephone: this.newOrder.contact_phone,
          VIP: this.newOrder.VIP,
          flight_number: this.newOrder.flight_number,
          scheduled_pick_up_at: this.newOrder.scheduled_pick_up_at == null? null: this.newOrder.scheduled_pick_up_at.toISOString()
        }
      }
    )).pipe(tap(order => {
      This.initializeOrder();
      if (order.scheduled_pick_up_at == null) {
        This.startWatchingOrder(order.id);
      }
      return order;
    }));
  }

  startWatchingOrder(id: number) {
    this.interval = null;
    this.interval = window.setInterval(() => this.getOrder(id), Constants.ORDER_GETTING_INTERVAL);      
  }

  getOrder(id: number) {
    const This = this;
    this.http.get<Order>('orders/' + id).subscribe(
      order => {
          switch (order.status) {
            case Status.driverConfirmed: {
              This.router.navigate(['order/confirmed-by-driver']);
              break;
            }
            case Status.driverArrived:
            case Status.driverArriving: {
              This.router.navigate(['order/watch-driver-arrive']);
              break;
            }
            case Status.fraud: {
              This.router.navigate(['order/fraud']);
              break;
            }
            case Status.canceled: {
              This.stopWatchingOrder(This);
              This.router.navigate(['order/canceled']);
              break;
            }
            case Status.finished: {
              This.stopWatchingOrder(This);
              (This) => This.clearCache();
              This.router.navigate(['order/finished']);
              break;
            }
        }
        This.fillOrderVehicle(order).subscribe(o => {
          This.currentOrderData = o;
          This.currentOrder.next(This.currentOrderData);      
        });
      }
    );
  }

  stopWatchingOrder(This) {
    window.clearInterval(This.interval);
  }

  cancelCurrentOrder() {
    const This = this;
    (This) => This.clearCache();
    return this.http.patch('orders/' + this.currentOrderData.id + '/cancel', '').pipe(tap(
      success => {
        This.stopWatchingOrder(This);
      }
    ));
  }

  clearCache() {
    localStorage.setItem('currentOrder', null);    
    this.currentOrderData = null;
    this.currentOrder.next(this.currentOrderData);
  }

  getScheduledOrders() {
    return this.http.get<{items: Order[]}>('orders/?page=1&per_page=100&scheduled').pipe(map(result => result.items));
  }

  private fillOrderVehicle(order: Order): Observable<Order>  {
    if (order.vehicle_id == null) {
      return of(order);
    } else {
      return this.getCar(order.vehicle_id).pipe(
        map(car => { 
           const o = order;
           o.vehicle = car;
           return o;
        })
      );

    }
  }

  getCar(id: number): Observable<Car> {
    if (this.currentOrderData !== null && this.currentOrderData.vehicle != null) {
      return of(this.currentOrderData.vehicle);
    } else {
      return this.http.get<Car>('vehicles/' + id);
    }
  }
}


export enum Status {
  created = 'created',
  driverConfirmed = 'driver_confirmed',
  driverArriving = 'driver_arriving',
  driverArrived = 'driver_arrived',
  customerPickedUp = 'customer_picked_up',
  finished = 'finished',
  canceled = 'canceled',
  fraud = 'fraud'
}

