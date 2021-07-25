import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { BussinessService } from '../service/bussiness.service';

@Component({
  selector: 'app-create-payment-voucher',
  templateUrl: './create-payment-voucher.component.html',
  styleUrls: ['./create-payment-voucher.component.css']
})
export class CreatePaymentVoucherComponent implements OnInit {

  @ViewChild('ward') wardDOM;
  cityList: AddressDetail[] = [];
  districtList: AddressDetail[] = [];
  wardList: AddressDetail[] = [];
  activateDistrict: boolean;
  activateWard: boolean;
  date: string;
  formCreateVoucher: FormGroup;

  constructor(private bussinessService: BussinessService) { }

  ngOnInit(): void {
    this.formCreateVoucher=new FormGroup(
      {
        'firstName': new FormControl('', [Validators.required]),
        'middleName': new FormControl(''),
        'lastName': new FormControl('', [Validators.required]),
        'city': new FormControl(''),
        'district': new FormControl(''),
        'ward': new FormControl(''),
        'address': new FormControl(''),
        'reason': new FormControl('', [Validators.required]),
        'type': new FormControl('', [Validators.required]),
        'amount': new FormControl('', [Validators.required]),
        'document': new FormControl('', [Validators.required]),
        'paid': new FormControl('', [Validators.required]),
      }
    );
    this.bussinessService.getAllCity().subscribe(city=>{
      this.cityList = city;
    })
    let currentDate = new Date();
    this.date = this.bussinessService.formatDate(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
  }

  cityPicked(value: string) {
    let cityId: string = '';
    if (value == '') {
      this.activateDistrict = true;
      return
    }
    this.activateWard = true;
    this.wardDOM.value = "";
    this.activateDistrict = false;
    for (var i = 0; i < this.cityList.length; i++) {
      if (this.cityList[i].getName() === value) {
        cityId = this.cityList[i].getId();
      }
    }
    this.bussinessService.getAllDistrictByCityId(cityId).subscribe(district => {
      this.districtList = district;
    })
  }

  districtPicked(value: string) {
    let districtId: string = '';
    if (value == '') {
      this.activateWard = true;
      return
    }
    this.activateWard = false;
    for (var i = 0; i < this.districtList.length; i++) {
      if (this.districtList[i].getName() === value) {
        districtId = this.districtList[i].getId();
      }
    }
    this.bussinessService.getAllWardByDistrictId(districtId).subscribe(ward => {
      this.wardList = ward;
    })
  }

  resetForm(){
    this.formCreateVoucher.reset();
  }

  onSubmit(){

  }

}
