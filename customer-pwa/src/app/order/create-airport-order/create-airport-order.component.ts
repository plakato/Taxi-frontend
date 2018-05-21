import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';
import { OrderService } from '../order.service';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'app-create-airport-order',
  templateUrl: './create-airport-order.component.html',
  styleUrls: ['./create-airport-order.component.scss']
})
export class CreateAirportOrderComponent implements OnInit {
  endpoint: { coords: LatLngLiteral, address: string } = { coords: null, address: ''};
  url: string;
  goingToAirport = false;

  constructor(private router: Router,
              private errorService: ErrorService,
              private orderService: OrderService) { 
    this.url = this.router.url;
  }

  ngOnInit() {
  }

  endpointChosen() {
    if (this.endpoint.coords != null) {
      const This = this;
      if (this.goingToAirport) {
        this.orderService.order.loc_start = this.endpoint.coords;
        this.orderService.order.startAddress = this.endpoint.address;
      } else {
        this.orderService.order.loc_finish = this.endpoint.coords;
        this.orderService.order.finishAddress = this.endpoint.address;
      }
      
      this.orderService.sendNewOrder().subscribe(
        success => {
          console.log('Successfuly sent.');
        },
        err => This.errorService.showMessageToUser('Vytvoření objednávky se nezdařilo.')
      );
    } else {
      this.errorService.showMessageToUser('Musíte zvolit adresu.');
    }
  }

  newEndpoint(newAddress) {
    // To keep the reference.
    this.endpoint.coords = newAddress.coords;
    this.endpoint.address = newAddress.address;
  }

}
