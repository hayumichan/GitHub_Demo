import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/share/model/cart.model';
import { CustomerServiceService } from '../service/customer-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: Cart[];
  sum: number = 0;

  constructor(private cusService: CustomerServiceService, private router:Router) { }

  ngOnInit(): void {
    this.carts = this.cusService.getAllCart();
    for (var i = 0; i < this.carts.length; i++) {
      this.sum += this.carts[i].getPrice()*this.carts[i].getQuantity();
    }
  }

  plus(id: number) {
    for (var i = 0; i < this.carts.length; i++) {
      if (this.carts[i].getProductId() == id) {
        this.carts[i].setQuantity(this.carts[i].getQuantity() + 1);
        this.sum = this.sum + this.carts[i].getPrice();
      }
    }
  }
  minus(id: number) {
    for (var i = 0; i < this.carts.length; i++) {
      if (this.carts[i].getProductId() == id) {
        if (this.carts[i].getQuantity() != 1)
          this.carts[i].setQuantity(this.carts[i].getQuantity() - 1);
          this.sum = this.sum - this.carts[i].getPrice();
      }
    }
  }

  removeItem(cart: Cart) {
    this.cusService.removeFromCart(cart);
    this.carts = this.cusService.getAllCart();
    this.sum -= cart.getPrice()*cart.getQuantity();
  }

  payment(){
    this.cusService.updateCart(this.carts);
    this.router.navigate(['/home/thanh-toan'])
  }
}
