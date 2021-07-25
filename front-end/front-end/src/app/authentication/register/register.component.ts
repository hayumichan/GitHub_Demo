import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { Address } from 'src/app/share/model/address.model';
import { AuthService } from '../service/auth.service';

export interface RegisterData {
  username: string,
  password: string,
  firstName: string,
  middleName: string,
  lastName: string,
  addressList: Address[];
  identification: string,
  email: string,
  phone: string,
  sex: string,
  dob: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('ward') wardDOM;
  cityList: AddressDetail[] = [];
  districtList: AddressDetail[] = [];
  wardList: AddressDetail[] = [];
  activateDistrict: boolean;
  activateWard: boolean;
  formRegister: FormGroup;
  hide = true;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'middleName': new FormControl(''),
      'lastName': new FormControl('', [Validators.required]),
      'city': new FormControl(''),
      'district': new FormControl(''),
      'ward': new FormControl(''),
      'address': new FormControl(''),
      'identification': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required]),
      'sex': new FormControl(''),
      'dob': new FormControl(''),
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
    })

    this.authService.getAllCity().subscribe(city => {
      this.cityList = city;
    });
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
    this.authService.getAllDistrictByCityId(cityId).subscribe(district => {
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
    this.authService.getAllWardByDistrictId(districtId).subscribe(ward => {
      this.wardList = ward;
    })
  }

  onSubmit() {
    let cityId: string = this.authService.getAddressId(this.cityList, this.formRegister.value['city']);
    let districtId: string = this.authService.getAddressId(this.districtList, this.formRegister.value['district']);
    let wardId: string = this.authService.getAddressId(this.wardList, this.formRegister.value['ward']);
    let addressList: Address[] = [new Address('1', new AddressDetail(cityId, this.formRegister.value['city']),
      new AddressDetail(districtId, this.formRegister.value['district']), new AddressDetail(wardId, this.formRegister.value['ward']),
      this.formRegister.value['address'])];
    let user: RegisterData = {
      username: this.formRegister.value['username'],
      password: this.formRegister.value['password'],
      firstName: this.formRegister.value['firstName'],
      middleName: this.formRegister.value['middleName'],
      lastName: this.formRegister.value['lastName'],
      identification: this.formRegister.value['identification'],
      dob: this.authService.formatDate(this.formRegister.value['dob'].getDate(), this.formRegister.value['dob'].getMonth(), this.formRegister.value['dob'].getFullYear()),
      sex: this.formRegister.value['sex'],
      phone: this.formRegister.value['phone'],
      email: this.formRegister.value['email'],
      addressList: addressList
    }
    this.authService.register(user).subscribe(res=>{
    }, errorMessage=>{
      this._snackBar.open("Thay đổi mật khẩu thành công", "Đóng", {
        duration: 2000,
      });
      this.router.navigate(['/dang-nhap']);
    })
  }

}
