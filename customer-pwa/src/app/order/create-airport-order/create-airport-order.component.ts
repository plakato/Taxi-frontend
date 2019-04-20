import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from '../../general/error/error.service';
import { OrderService } from '../order.service';
import { LatLngLiteral } from '@agm/core';
import { Constants } from '../../../assets/const';

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
        this.orderService.newOrder.loc_start = this.endpoint.coords;
        this.orderService.newOrder.startAddress = this.endpoint.address;
        this.orderService.newOrder.loc_finish = Constants.DEFAULT_AIRPORT_ADDRESS;        
      } else {
        this.orderService.newOrder.loc_finish = this.endpoint.coords;
        this.orderService.newOrder.finishAddress = this.endpoint.address;
        this.orderService.newOrder.loc_start = Constants.DEFAULT_AIRPORT_ADDRESS;                
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
