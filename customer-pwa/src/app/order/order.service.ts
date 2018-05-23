import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.module';
import { tap } from 'rxjs/operators';
import { Constants } from '../../assets/const';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit {
  public newOrder: Order;
  private currentOrderData: Order;  
  public currentOrder: BehaviorSubject<Order> = new BehaviorSubject(this.currentOrderData);
  private interval = null;

  constructor(private http: HttpClient,
              private router: Router) {
    this.initializeOrder();    
   }

  ngOnInit() {
  }

  initializeOrder() {
    this.newOrder = {} as any;
  }

  sendNewOrder() {
    const This = this;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<Order>('orders', JSON.stringify(
      {
        order: {
          customer_telephone: this.newOrder.phone,
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
    if (this.interval == null) {
      this.interval = window.setInterval(() => this.getOrder(id), Constants.ORDER_GETTING_INTERVAL);      
    }
  }

  getOrder(id: number) {
    const This = this;
    this.http.get<Order>('orders' + id).subscribe(
      order => {
        // React to change in status.
        if (order.status !== This.currentOrderData.status) {
          switch (This.currentOrderData.status) {
            case Status.driverConfirmed: {
              This.router.navigate(['order/confirmed-by-driver']);
              break;
            }
            case Status.driverArriving: {
              This.router.navigate(['order/watch-driver-arrive']);
              break;
            }
            case Status.fraud: {
              This.router.navigate(['order/fraud']);
              break;
            }
            case Status.canceled: {
              This.stopWatchingOrder();
              This.router.navigate(['order/canceled']);
              break;
            }
            case Status.finished: {
              This.stopWatchingOrder();
              This.router.navigate(['order/finished']);
              break;
            }
            
          }
        }
        This.currentOrderData = order;
        This.currentOrder.next(this.currentOrderData);      
      }
    );
  }

  stopWatchingOrder() {
    window.clearInterval(this.interval);
  }

  cancelCurrentOrder() {
    const This = this;
    return this.http.patch('orders/' + this.currentOrderData.id + '/cancel', '').pipe(tap(
      success => {
        This.stopWatchingOrder();
      }
    ));
  }

  getScheduledOrders() {
    return this.http.get('orders', { params: {scheduled: true}});
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

