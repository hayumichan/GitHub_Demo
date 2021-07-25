import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/share/model/product.model';
import { CustomerServiceService } from '../service/customer-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  products: Product[];
  row: number;
  rows: [number] = [0];
  cartItem: number = 0;

  constructor(private cusService:CustomerServiceService, private router:Router) { }

  ngOnInit(): void {
    this.products = this.cusService.getAllProduct();
    this.row = Math.ceil(this.products.length/4);
    this.rows.splice(0,1);
    for(var i=0; i<this.row; i++){
      this.rows.push(i);
    }
    this.cartItem = this.cusService.getAllCart().length;
  }

  chooseItem(id: number){
    this.router.navigate(['/home/thuc-don',id]);
  }

}
