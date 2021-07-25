import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/share/model/product.model';
import { CashierServiceService } from '../service/cashier-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  row: number;
  rows: [number] = [0];
  cartItem: number = 0;

  constructor(private cashierService:CashierServiceService, private router:Router) { }

  ngOnInit(): void {
    this.products = this.cashierService.getAllProduct();
    this.row = Math.ceil(this.products.length/4);
    this.rows.splice(0,1);
    for(var i=0; i<this.row; i++){
      this.rows.push(i);
    }
  }

  chooseItem(product: Product){
    if (product.getStatus()){
      this.cashierService.chooseProduct.emit(product);
    }
  }

}
