import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { Address } from 'src/app/share/model/address.model';
import { Employee } from 'src/app/share/model/employee.model';
import { AddUsernameComponent } from '../add-username/add-username.component';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @ViewChild('ward') wardDOM;
  employeRoles: string[] = [];
  remainRoles: string[] = ['Quản lý nhà hàng', 'Kế toán', 'Thu ngân', 'Bồi bàn', 'Đầu bếp', 'Nhân viên tạp vụ', 'Phụ bếp'];
  employeeSelectedRoles: string[] = [];
  remainSelectedRoles: string[] = [];
  cityList: AddressDetail[] = [];
  districtList: AddressDetail[] = [];
  wardList: AddressDetail[] = [];
  addEmpForm: FormGroup;
  activateDistrict: boolean;
  activateWard: boolean;
  errorRole: boolean = false;
  hasAccount: boolean = false;

  constructor(private empService: EmployeeService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addEmpForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'middleName': new FormControl(null),
      'lastName': new FormControl(null, [Validators.required]),
      'city': new FormControl(null),
      'district': new FormControl(null),
      'ward': new FormControl(null),
      'address': new FormControl(null),
      'identification': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'restaurant': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
      'sex': new FormControl(null),
      'dob': new FormControl(null)
    })

    this.empService.getAllCity().subscribe(city => {
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
    this.empService.getAllDistrictByCityId(cityId).subscribe(district => {
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
    this.empService.getAllWardByDistrictId(districtId).subscribe(ward => {
      this.wardList = ward;
    })
  }

  minusRoles() {
    for (var i = 0; i < this.employeeSelectedRoles.length; i++) {
      for (var j = 0; j < this.employeRoles.length; j++) {
        if (this.employeeSelectedRoles[i] == this.employeRoles[j]) {
          this.employeRoles.splice(j, 1);
          this.remainRoles.push(this.employeeSelectedRoles[i]);
        }
      }
    }
  }

  addRoles() {
    for (var i = 0; i < this.remainSelectedRoles.length; i++) {
      for (var j = 0; j < this.remainRoles.length; j++) {
        if (this.remainSelectedRoles[i] == this.remainRoles[j]) {
          this.remainRoles.splice(j, 1);
          this.employeRoles.push(this.remainSelectedRoles[i]);
        }
      }
    }
  }

  onSubmit() {
    if (this.employeRoles.length == 0) {
      this.errorRole = true;
      return;
    } else {
      this.errorRole = false;
      let cityId: string = this.empService.getAddressId(this.cityList, this.addEmpForm.value['city']);
      let districtId: string = this.empService.getAddressId(this.districtList, this.addEmpForm.value['district']);
      let wardId: string = this.empService.getAddressId(this.wardList, this.addEmpForm.value['ward']);
      let addressList: Address[] = [new Address('1', new AddressDetail(cityId, this.addEmpForm.value['city']), new AddressDetail(districtId, this.addEmpForm.value['district']), new AddressDetail(wardId, this.addEmpForm.value['ward']), this.addEmpForm.value['address'])];
      let employee = new Employee(1, this.addEmpForm.value['firstName'], this.addEmpForm.value['middleName'], this.addEmpForm.value['lastName'], '', this.addEmpForm.value['email'], this.addEmpForm.value['phone'], this.addEmpForm.value['sex'],
        this.empService.formatDate(this.addEmpForm.value['dob'].getDate(), this.addEmpForm.value['dob'].getMonth(), this.addEmpForm.value['dob'].getFullYear()),
        addressList, this.employeRoles, this.addEmpForm.value['restaurant'], this.addEmpForm.value['identification'], true);
      for (var i = 0; i < this.employeRoles.length; i++) {
        if (this.employeRoles[i] === 'Quản lý nhà hàng' || this.employeRoles[i] === 'Kế toán' || this.employeRoles[i] === 'Thu ngân') {
          this.hasAccount = true;
        }
      }
      this.empService.newEmployee = employee;
      if (this.hasAccount) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "35%";
        this.dialog.open(AddUsernameComponent, dialogConfig).afterClosed().subscribe(result => {
          this._snackBar.open("Thêm nhân viên thành công", "Đóng", {
            duration: 2000,
          });
        });
      }
      else {
        this.hasAccount = false;
        this.empService.createNewEmployee('');
      }
    }
  }

}
