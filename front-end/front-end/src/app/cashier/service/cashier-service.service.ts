import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Bill } from 'src/app/share/model/bill.model';
import { Cart } from 'src/app/share/model/cart.model';
import { Product } from 'src/app/share/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CashierServiceService {

  chooseProduct = new EventEmitter<Product>();

  constructor() { }

  getAllProduct(){
    const products: Product[] = [
      new Product(1, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(2, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(3, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', false),
      new Product(4, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
      new Product(5, 'Phở bò tái chín', 'Phở', 20000, 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg',
      'Nguyên liệu bao gồm: các loại thịt (thịt bò, thịt gà), bột gạo, hành khô, nước mắm, gừng, muối, và các loại gia vị như thảo quả, hoa hồi, và đinh hương. Một số phiên bản sẽ bao gồm hành tây, rau mùi, hành lá, và hạt tiêu đen.', true),
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

  getAllBill(pageNumber: number){
    let carts1: Cart[] = [
      new Cart(1, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(2, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(3, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(4, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2)
    ];

    let carts2: Cart[] = [
      new Cart(1, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(2, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(3, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
    ];

    let carts3: Cart[] = [
      new Cart(5, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(6, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2)
    ];

    let carts4: Cart[] = [
      new Cart(5, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2)
    ];

    let carts5: Cart[] = [
      new Cart(5, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(1, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(2, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(3, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2),
      new Cart(4, 'Phở bò tái chín', 'https://i.pinimg.com/originals/be/69/71/be6971349381f37f41b3a9eaadbe3eae.jpg', 20000, 2)
    ];
  
    let bills: Bill[] = [
      new Bill('Hóa đơn 1', carts2, false),
      new Bill('Hóa đơn 2', carts1, false),
      new Bill('Hóa đơn 3', carts5, false),
      new Bill('Hóa đơn 4', carts4, false),
      new Bill('Hóa đơn 5', carts3, false)
    ];

    return bills;
  }

  billPaging(bills: Bill[], pageNumber: number){
    let newBillPaging: Bill[] = [];
    for (var i = pageNumber*6; i<bills.length; i++){
      newBillPaging.push(bills[i]);
    }
    return newBillPaging;
  }

}
