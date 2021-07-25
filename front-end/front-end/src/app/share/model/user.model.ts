export class User{
    constructor(private username: string, private  role: [], private token: string){}

    getUsername(){
        return this.username;
    }

    getRole(){
        return this.role;
    }

    getToken(){
        return this.token;
    }
    
}