import { Role } from "./role.model";

export class Account{
    private id: number;
    private username: string;
    private createdDate: string;
    private deleted: boolean;
    private role: string[];

    constructor(id: number, username: string, createdDate: string, deleted: boolean, role: string[] ){
        this.id=id;
        this.createdDate=createdDate;
        this.username=username;
        this.deleted=deleted;
        this.role=role;
    }

    getId(){
        return this.id;
    }

    getUsername(){
        return this.username;
    }

    getCreatedDate(){
        return this.createdDate;
    }

    getDeleted(){
        return this.deleted;
    }

    getRole(){
        return this.role;
    }

    toggleActive(){
        this.deleted = !this.deleted;
    }
}
