import { ViewChild } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { Address } from 'src/app/share/model/address.model';
import { ManageAccountComponent } from '../manage-acc/manage-acc.component';
import { CreateAccService } from '../service/create-acc.service';

@Component({
  selector: 'app-edit-acc-address',
  templateUrl: './edit-acc-address.component.html',
  styleUrls: ['./edit-acc-address.component.css']
})
export class EditAccAddressComponent implements OnInit {

  @ViewChild('ward') wardDOM;
  cityList: AddressDetail[] = [];
  districtList: AddressDetail[] = [];
  wardList: AddressDetail[] = [];
  activateDistrict: boolean;
  activateWard: boolean;
  formEditAddress: FormGroup = new FormGroup({
    'city': new FormControl(''),
    'district': new FormControl(''),
    'ward': new FormControl(''),
    'address': new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA)public data: { address: Address, edit: boolean }, private accService: CreateAccService, private dialogRef: MatDialogRef<ManageAccountComponent>) { }

  ngOnInit(): void {
    if (this.data.edit) {
      this.accService.getAllCity().pipe(take(1))
        .toPromise()
        .then((city: AddressDetail[]) => {
          this.cityList = city;
          this.accService.getAllDistrictByCityId(this.data.address.getCityId().getId()).pipe(take(1))
            .toPromise()
            .then((district: AddressDetail[]) => {
              this.activateDistrict = false;
              this.districtList = district;
              this.accService.getAllWardByDistrictId(this.data.address.getDistrictId().getId()).pipe(take(1))
                .toPromise()
                .then((ward: AddressDetail[]) => {
                  this.activateWard = false;
                  this.wardList = ward;
                  this.formEditAddress = new FormGroup({
                    'city': new FormControl(this.data.address.getCityId().getName()),
                    'district': new FormControl(this.data.address.getDistrictId().getName()),
                    'ward': new FormControl(this.data.address.getWardId().getName()),
                    'address': new FormControl(this.data.address.getAddressDetail())
                  });
                })
            })
        })
    } else {
      this.accService.getAllCity().subscribe(city => {
        this.cityList = city;
      })
    }
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
    this.accService.getAllDistrictByCityId(cityId).subscribe(district => {
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
    this.accService.getAllWardByDistrictId(districtId).subscribe(ward => {
      this.wardList = ward;
    })
  }

  onSubmit() {
    let cityId = this.accService.getAddressId(this.cityList, this.formEditAddress.value['city']);
    let districtId = this.accService.getAddressId(this.districtList, this.formEditAddress.value['district']);
    let wardId = this.accService.getAddressId(this.wardList, this.formEditAddress.value['ward']);
    let id = '1';
    if (this.data.edit) {
      id = this.data.address.getId();
    }
    let address: Address = new Address(id,
      new AddressDetail(cityId, this.formEditAddress.value['city']),
      new AddressDetail(districtId, this.formEditAddress.value['district']),
      new AddressDetail(wardId, this.formEditAddress.value['ward']),
      this.formEditAddress.value['address']);
    if (this.data.edit) {
      this.accService.editAccountAddress(address);
      this.dialogRef.close(address);
    }
    else {
      this.accService.addAccountAddress(address);
      this.dialogRef.close(address);
    }
  }

}
