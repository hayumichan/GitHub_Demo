import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

import { Product } from "../../share/model/product.model";

interface resData {
  products:[
    {prodId:string,
    prodName:string,
    prodDescription: string,
    prodImageUrl:string
    }
  ]
}

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  product: Product[] = [];

  url:string = environment.apiUrl + '/api/product/get-product';

  constructor(private httpClient: HttpClient) { }

  // getProducts() {
  //   return this.httpClient.get<resData>(this.url).
  //       pipe(
  //          tap((resData) => {
  //            for(var i=0;i< resData.products.length; i++){
  //             this.product.push(new Product(
  //               resData.products[i].prodId,
  //               resData.products[i].prodName,
  //               resData.products[i].prodDescription,
  //               resData.products[i].prodImageUrl ));
  //               //console.log(resData.products[i].prodName);
  //            }           
  //            return resData;
  //          }), catchError( error => {
  //            return throwError( error );
  //          })
  //       )
  //   }
}
