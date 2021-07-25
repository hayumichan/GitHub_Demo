import { Address } from "./address.model";

export class Employee {
    constructor(private id: number, private firstName: string, private middleName: string, private lastName: string, private username: string, private email: string, private phone: string, private sex: string, private dob: string, private address: Address[], private roles: string[], private restaurantId: number, private identification: string, private status: boolean) { }
    getId(){
        return this.id;
    }

    getIdentification(){
        return this.identification;
    }

    getRestaurantId(){
        return this.restaurantId;
    }

    getFirstName(){
        return this.firstName;
    }

    getMiddleName(){
        return this.middleName;
    }

    getLastName(){
        return this.lastName;
    }

    getFullName(){
          if(this.middleName == null){
            this.middleName = '';
            return this.firstName + " " + this.lastName;
          }
          return this.firstName + " " + this.middleName + " " + this.lastName;
        }
    
    getUsername(){
        return this.username;
    }

    getEmail(){
        return this.email;
    }

    getPhone(){
        return this.phone;
    }

    getSex(){
        return this.sex;
    }

    getDob(){
        return this.dob;
    }

    getAddress(){
        return this.address;
    }
    
    getRoles(){
        return this.roles;
    }
    
    getStatus(){
        return this.status;
    }
    
    toggleStatus(){
        this.status = !this.status;
    }
}