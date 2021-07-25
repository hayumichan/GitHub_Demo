export class Product{
    constructor(private id: number, private name: string, private category: string, private price: number, private img: string, private description: string, private status: boolean){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getCategory(){
        return this.category;
    }

    getPrice(){
        return this.price;
    }

    getImg(){
        return this.img;
    }

    getDescription(){
        return this.description;
    }

    getStatus(){
        return this.status;
    }

    toggleStatus(){
        this.status = !this.status;
    }
}