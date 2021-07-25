import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Cart } from 'src/app/share/model/cart.model';
import { Product } from 'src/app/share/model/product.model';
import { CustomerServiceService } from '../service/customer-service.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  product: Product;
  inputNumber: number = 1;
  cartItem: number = 0;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

  constructor(private router: Router, private cusService:CustomerServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = this.cusService.getProductById(this.route.snapshot.params['id']);
    this.cartItem = this.cusService.getAllCart().length;
  }

  addToCart(){
    this.cusService.addToCart(new Cart(this.product.getId(), this.product.getName(), this.product.getImg(), this.product.getPrice(), this.inputNumber));
    this.cartItem = this.cusService.getAllCart().length;
  }

}
