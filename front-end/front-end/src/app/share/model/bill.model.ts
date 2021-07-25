import { Cart } from "./cart.model";


export class Bill{
    constructor(private id: string, private cart: Cart[], private isActive: boolean){}

    getId(){
        return this.id;
    }

    getCart(){
        return this.cart;
    }

    setCart(carts: Cart[]){
        this.cart = carts;
    }

    getIsAtive(){
        return this.isActive;
    }

    toggleActive(){
        this.isActive = !this.isActive;
    }
}