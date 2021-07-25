import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { Address } from 'src/app/share/model/address.model';
import { Employee } from 'src/app/share/model/employee.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  @ViewChild('ward') wardDOM;
  employee: Employee;
  nam: string = '';
  ngay: string = '';
  thang: string = '';
  roles: string[] = ['Quản lý nhà hàng', 'Kế toán', 'Thu ngân', 'Đầu bếp', 'Nhân viên phục vụ', 'Phụ bếp'];
  employeRoles: string[] = [];
  remainRoles: string[] = [];
  employeeSelectedRoles: string[] = [];
  remainSelectedRoles: string[] = [];
  status: boolean;
  username: string;
  cityList: AddressDetail[] = [];
  districtList: AddressDetail[] = [];
  wardList: AddressDetail[] = [];
  activateDistrict: boolean;
  activateWard: boolean;
  errorRole: boolean = false;
  formEditEmp: FormGroup = new FormGroup({
    'firstName': new FormControl('', [Validators.required]),
    'middleName': new FormControl(''),
    'lastName': new FormControl('', [Validators.required]),
    'city': new FormControl(''),
    'district': new FormControl(''),
    'ward': new FormControl(''),
    'address': new FormControl(''),
    'identification': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'restaurant': new FormControl('', [Validators.required]),
    'phone': new FormControl('', [Validators.required]),
    'sex': new FormControl(''),
    'dob': new FormControl('')
  });

  constructor(private route: ActivatedRoute, private empService: EmployeeService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.empService.getEmpById(this.route.snapshot.params['id']).pipe(take(1))
      .toPromise()
      .then((emp: Employee) => {
        this.employee = emp;
        this.employeRoles = this.employee.getRoles();
        this.status = this.employee.getStatus();
        this.username = this.employee.getUsername();
        if (this.employee.getDob() != null) {
          this.nam = this.employee.getDob().substring(0, this.employee.getDob().indexOf('-'));
          this.thang = this.employee.getDob().substring(this.employee.getDob().indexOf('-') + 1, this.employee.getDob().lastIndexOf('-'));
          this.ngay = this.employee.getDob().substr(this.employee.getDob().lastIndexOf('-') + 1);
        }
        let hasRole: boolean;
        this.empService.getAllCity().pipe(take(1))
          .toPromise()
          .then((city: AddressDetail[]) => {
            this.cityList = city;
            this.empService.getAllDistrictByCityId(this.employee.getAddress()[0].getCityId().getId()).pipe(take(1))
              .toPromise()
              .then((district: AddressDetail[]) => {
                this.activateDistrict = false;
                this.districtList = district;
                this.empService.getAllWardByDistrictId(this.employee.getAddress()[0].getDistrictId().getId()).pipe(take(1))
                  .toPromise()
                  .then((ward: AddressDetail[]) => {
                    this.activateWard = false;
                    this.wardList = ward;

                    for (var i = 0; i < this.roles.length; i++) {
                      if (!hasRole && i > 0) {
                        this.remainRoles.push(this.roles[i - 1]);
                      }
                      hasRole = false;
                      for (var j = 0; j < this.employeRoles.length; j++) {
                        if (this.roles[i] == this.employeRoles[j]) {
                          hasRole = true;
                        }
                      }
                      if (!hasRole && i == this.roles.length - 1) {
                        this.remainRoles.push(this.roles[i]);
                      }
                    }
                    this.formEditEmp = new FormGroup({
                      'firstName': new FormControl(this.employee.getFirstName(), [Validators.required]),
                      'middleName': new FormControl(this.employee.getMiddleName()),
                      'lastName': new FormControl(this.employee.getLastName(), [Validators.required]),
                      'city': new FormControl(this.employee.getAddress()[0].getCityId().getName()),
                      'district': new FormControl(this.employee.getAddress()[0].getDistrictId().getName()),
                      'ward': new FormControl(this.employee.getAddress()[0].getWardId().getName()),
                      'address': new FormControl(this.employee.getAddress()[0].getAddressDetail()),
                      'identification': new FormControl(this.employee.getIdentification(), [Validators.required]),
                      'email': new FormControl(this.employee.getEmail(), [Validators.required, Validators.email]),
                      'restaurant': new FormControl(this.employee.getRestaurantId()+'', [Validators.required]),
                      'phone': new FormControl(this.employee.getPhone(), [Validators.required]),
                      'sex': new FormControl(this.employee.getSex()),
                      'dob': new FormControl(new Date(+this.nam, +this.thang - 1, +this.ngay))
                    })
                  })
              })
          })
      });
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

  onSubmit() {
    if (this.employeRoles.length == 0) {
      this.errorRole = true;
      return;
    } else {
      this.errorRole = false;
      console.log(this.employee.getAddress()[0].getId());
      let cityId: string = this.empService.getAddressId(this.cityList, this.formEditEmp.value['city']);
      let districtId: string = this.empService.getAddressId(this.districtList, this.formEditEmp.value['district']);
      let wardId: string = this.empService.getAddressId(this.wardList, this.formEditEmp.value['ward']);
      let addressList: Address[] = [new Address(this.employee.getAddress()[0].getId(),new AddressDetail(cityId, this.formEditEmp.value['city']), new AddressDetail(districtId, this.formEditEmp.value['district']), new AddressDetail(wardId, this.formEditEmp.value['ward']), this.formEditEmp.value['address'])];
      let employee = new Employee(1, this.formEditEmp.value['firstName'], this.formEditEmp.value['middleName'], this.formEditEmp.value['lastName'], this.employee.getUsername(), this.formEditEmp.value['email'], this.formEditEmp.value['phone'], this.formEditEmp.value['sex'],
        this.empService.formatDate(this.formEditEmp.value['dob'].getDate(), this.formEditEmp.value['dob'].getMonth(), this.formEditEmp.value['dob'].getFullYear()),
        addressList, this.employeRoles, this.formEditEmp.value['restaurant'], this.formEditEmp.value['identification'], true);
      this.empService.editEmployee(employee).subscribe(resData=>{

      }, errorObject=>{
        this._snackBar.open("Sửa nhân viên thành công", "Đóng", {
          duration: 2000,
        });
      });
    }
  }
}
