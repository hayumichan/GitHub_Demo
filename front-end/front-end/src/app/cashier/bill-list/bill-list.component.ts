import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/share/model/bill.model';
import { Cart } from 'src/app/share/model/cart.model';
import { Product } from 'src/app/share/model/product.model';
import { CashierServiceService } from '../service/cashier-service.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  sum: number = 0;
  carts: Cart[];
  bills: Bill[];
  pageBill: number = 0;

  isActive: boolean = true;

  constructor(private share: CashierServiceService) { }

  ngOnInit(): void {
    this.bills = this.share.getAllBill(0);
    this.carts = this.bills[0].getCart();
    this.bills[0].toggleActive();
    this.updateSum();
    this.share.chooseProduct.subscribe((product: Product) => {
      this.carts.push(new Cart(product.getId(), product.getName(), product.getImg(), product.getPrice(), 1));
      for (var i = 0; i < this.bills.length; i++) {
        if (this.bills[i].getIsAtive() === true) {
          this.bills[i].setCart(this.carts);
        }
      }
      this.updateSum();
    })
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

  chooseBill(id: string) {
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i].getIsAtive() === true) {
        this.bills[i].toggleActive();
      }
      if (this.bills[i].getId() === id) {
        this.carts = this.bills[i].getCart();
        this.updateSum();
        this.bills[i].toggleActive();
      }
    }
  }

  addBill() {
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i].getIsAtive() === true) {
        this.bills[i].toggleActive();
      }
    }
    this.bills.push(new Bill('Hóa đơn ' + (this.bills.length + 10), [], true));
    if (Math.floor(this.bills.length/6)*6+1 == this.bills.length){
      this.bills = this.share.billPaging(this.bills, Math.floor(this.bills.length/6));
    }
    this.carts = [];
    this.sum = 0;
  }

  removeBill() {
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i].getIsAtive() === true) {
        this.bills.splice(i, 1);
      }
    }
    this.carts = this.bills[0].getCart();
    this.bills[0].toggleActive();
  }

  removeItem(id: number) {
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i].getIsAtive() == true) {
        for (var j = 0; j < this.bills[i].getCart().length; j++) {
          if (this.bills[i].getCart()[j].getProductId() == id) {
            this.bills[i].getCart().splice(j, 1);
          }
        }
      }
    }
    this.updateSum();
  }

  updateSum(){
    this.sum = 0;
    for (var j = 0; j < this.carts.length; j++) {
      this.sum += this.carts[j].getPrice() * this.carts[j].getQuantity();
    }
  }
}
