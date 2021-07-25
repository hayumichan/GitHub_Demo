import { Injectable } from '@angular/core';
import { Cart } from 'src/app/share/model/cart.model';
import { Category } from 'src/app/share/model/category.model';
import { Product } from 'src/app/share/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor() { }

  getAllProduct(){
    const products: Product[] = [
      new Product(1, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(2, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(3, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(4, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(5, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', false),
      new Product(6, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(7, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(8, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', false),
      new Product(9, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
    ];
    return products;
  }

  getAllCategory(){
    const category: Category[] = [
      new Category(1, 'Phở', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg'),
      new Category(2, 'Combo', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg'),
      new Category(3, 'Mỳ', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg'),
      new Category(4, 'Đồ uống', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg'),
      new Category(5, 'Lẩu', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg'),
      new Category(6, 'Khác', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg')
    ];
    return category;
  }

  getProductById(id: number){
    const products:Product[] = this.getAllProduct();
    for(var i =0;i<products.length;i++){
      if(products[i].getId() == id){
        return products[i];
      }
    }
  }

  getAllCart(){
    let carts = JSON.parse(localStorage.getItem('cart'));
    if(!carts){
      carts = [];
    }
    let cart:Cart[] = [];
    for (var i=0;i<carts.length;i++){
      cart.push(new Cart(+carts[i].productId, carts[i].productName, carts[i].img, carts[i].price, carts[i].quantity));
    }
    return cart;
  }

  addToCart(cart: Cart){
    let haveInCart:boolean = false;
    let carts = JSON.parse(localStorage.getItem('cart'));
    if(!carts){
      carts = [];
    }
    for(var i =0; i<carts.length;i++){
      if(+carts[i].productId == cart.getProductId()){
        carts[i].quantity = +carts[i].quantity + cart.getQuantity();
        haveInCart = true;
      }
    }
    if(!haveInCart){
      carts.push(cart);
    }
    localStorage.setItem('cart', JSON.stringify(carts));
  }

  removeFromCart(cart:Cart){
    let carts = JSON.parse(localStorage.getItem('cart'));
    for(var i=0;i<carts.length;i++){
      if(+carts[i].productId == cart.getProductId()){
        carts.splice(i, 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(carts));
  }

  removeCart(){
    localStorage.clear();
  }

  updateCart(cart: Cart[]){
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
