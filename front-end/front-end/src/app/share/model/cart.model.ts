export class Cart{
    constructor(private productId: number, private productName: string, private img: string, private price: number, private quantity: number){}

    getProductId(){
        return this.productId;
    }

    getProductName(){
        return this.productName;
    }

    getImg(){
        return this.img;
    }

    getPrice(){
        return this.price;
    }

    getQuantity(){
        return this.quantity;
    }

    setQuantity(quantity: number){
        this.quantity = quantity;
    }

}