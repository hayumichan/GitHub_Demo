import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../service/customer-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  cartItem: number = 0;

  constructor(private cusService: CustomerServiceService) { }

  ngOnInit(): void {
    this.cartItem = this.cusService.getAllCart().length;
  }
}
