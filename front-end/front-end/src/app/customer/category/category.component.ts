import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/share/model/category.model';
import { CustomerServiceService } from '../service/customer-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  cartItem: number = 0; 
  category: Category[];
  row: number;
  rows: [number] = [0];
  constructor(private cusService: CustomerServiceService) { }

  ngOnInit(): void {
    this.category = this.cusService.getAllCategory();
    this.row = Math.ceil(this.category.length/4);
    this.rows.splice(0,1);
    for(var i=0; i<this.row; i++){
      this.rows.push(i);
    }
    this.cartItem = this.cusService.getAllCart().length;
  }

}
