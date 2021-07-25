import { Address } from "./address.model";

export class UserDetail {
    constructor(private id: number,
         private firstName: string,
         private middleName: string,
         private lastName: string,
         private username: string, 
         private email: string,
         private phone: string, 
         private sex: string, 
         private dob: string, 
         private address: Address[],  
         private identification: string) { }
    getId(){
        return this.id;
    }

    getIdentification(){
        return this.identification;
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
    
}