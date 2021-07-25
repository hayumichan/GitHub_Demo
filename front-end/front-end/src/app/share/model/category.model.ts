export class Category{
    constructor(private id: number, private name: string, private img: string){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getImg(){
        return this.img;
    }
}