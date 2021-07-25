import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../service/service.service";
import { HttpClient } from '@angular/common/http';
import { Product } from '../../share/model/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})



export class ListProductComponent implements OnInit {

  products : Product[];

  constructor(public http: HttpClient, private serviceService: ServiceService) { }

  ngOnInit(): void {
    // this.getProductsList();
  }

  // getProductsList() {
  //   this.serviceService
  //   .getProducts()
  //   .subscribe((data:any) => {
  //     console.log('data: ' + data);
  //     this.products = data.products;
  //     //this.products = this.serviceService.product;
  //     console.log(this.products);
  //     //console.log(" --- " + this.serviceService.product);
  //     // console.error(this.products);
  //   });
  // }

}
