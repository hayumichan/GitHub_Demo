import { AddressDetail } from "./address-detail.model";

export class Address{
    constructor(private id: string, private cityId: AddressDetail, private districtId: AddressDetail, private wardId: AddressDetail, private addressDetail: string){}
    
    getId(){
        return this.id;
    }

    getCityId(){
        return this.cityId;
    }

    setCityId(cityId: AddressDetail){
        this.cityId = cityId;
    }

    getDistrictId(){
        return this.districtId;
    }

    setDistrictId(districtId: AddressDetail){
        this.districtId = districtId;
    }

    getWardId(){
        return this.wardId;
    }

    setWardId(wardId: AddressDetail){
        this.wardId = wardId;
    }

    getAddressDetail(){
        return this.addressDetail;
    }

    setAddressDetail(addressDetail:string){
        this.addressDetail = addressDetail;
    }
}