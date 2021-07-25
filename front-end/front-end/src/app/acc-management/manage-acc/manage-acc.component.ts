import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { EmployeeService } from 'src/app/employee/service/employee.service';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { Address } from 'src/app/share/model/address.model';
import { Employee } from 'src/app/share/model/employee.model';
import { UserDetail } from 'src/app/share/model/user-detail.model';
import { ChangePassComponent } from '../change-pass/change-pass.component';
import { EditAccAddressComponent } from '../edit-acc-address/edit-acc-address.component';
import { CreateAccService } from '../service/create-acc.service';

export interface AccountEdit{
  firstName: string,
  middleName: string,
  lastName: string,
  identidficationNumber: string,
  email: string,
  phone: string,
  sex: string, 
  dob: string
}

@Component({
  selector: 'app-manage-acc',
  templateUrl: './manage-acc.component.html',
  styleUrls: ['./manage-acc.component.css']
})
export class ManageAccountComponent implements OnInit {

  @ViewChild('ward') wardDOM;
  userDetail: UserDetail;
  nam: string = '';
  ngay: string = '';
  thang: string = '';
  username: string;
  addressList: Address[];
  formEditAcc: FormGroup = new FormGroup({
    'firstName': new FormControl('', [Validators.required]),
    'middleName': new FormControl(''),
    'lastName': new FormControl('', [Validators.required]),
    'identification': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'phone': new FormControl('', [Validators.required]),
    'sex': new FormControl(''),
    'dob': new FormControl('')
  });

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private accService: CreateAccService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.username = userData.username;
    this.accService.getAccByUsername(this.username).pipe(take(1))
      .toPromise()
      .then((acc: UserDetail) => {
        this.userDetail = acc;
        if (this.userDetail.getDob() != null) {
          this.nam = this.userDetail.getDob().substring(0, this.userDetail.getDob().indexOf('-'));
          this.thang = this.userDetail.getDob().substring(this.userDetail.getDob().indexOf('-') + 1, this.userDetail.getDob().lastIndexOf('-'));
          this.ngay = this.userDetail.getDob().substr(this.userDetail.getDob().lastIndexOf('-') + 1);
        }
        this.addressList = this.userDetail.getAddress();
        this.formEditAcc = new FormGroup({
          'firstName': new FormControl(this.userDetail.getFirstName(), [Validators.required]),
          'middleName': new FormControl(this.userDetail.getMiddleName()),
          'lastName': new FormControl(this.userDetail.getLastName(), [Validators.required]),
          'identification': new FormControl(this.userDetail.getIdentification(), [Validators.required]),
          'email': new FormControl(this.userDetail.getEmail(), [Validators.required, Validators.email]),
          'phone': new FormControl(this.userDetail.getPhone(), [Validators.required]),
          'sex': new FormControl(this.userDetail.getSex()),
          'dob': new FormControl(new Date(+this.nam, +this.thang - 1, +this.ngay))
        })
      });
  }

  onSubmit() {
    let userDetai: AccountEdit = {
      firstName: this.formEditAcc.value['firstName'],
      middleName: this.formEditAcc.value['middleName'],
      lastName: this.formEditAcc.value['lastName'],
      identidficationNumber: this.formEditAcc.value['identification'],
      email: this.formEditAcc.value['email'],
      phone: this.formEditAcc.value['phone'],
      sex: this.formEditAcc.value['sex'],
      dob: this.accService.formatDate(this.formEditAcc.value['dob'].getDate(), this.formEditAcc.value['dob'].getMonth(), this.formEditAcc.value['dob'].getFullYear())
    }

    this.accService.editAccount(userDetai)
    .subscribe(resData=>{
      this._snackBar.open("Sửa nè", "Đóng", {
        duration: 2000,
      });
    }, errorObject=>{
      console.log(errorObject)
      this._snackBar.open("Sửa thông tin tài khoản thành công", "Đóng", {
        duration: 2000,
      });
    });;
  }

  openEditAddressDialog(id: string){
    let address: Address;
    for (var i = 0; i<this.addressList.length;i++){
      if (this.addressList[i].getId() === id ){
        address = this.addressList[i];
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {
      address: address,
      edit: true
    }
    this.dialog.open(EditAccAddressComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result){
        this._snackBar.open("Sửa địa chỉ thành công", "Đóng", {
          duration: 2000,
        });
        let address:Address = result;
        for (var i=0;i<this.addressList.length; i++){
          if(this.addressList[i].getId() === address.getId()){
            this.addressList[i].setCityId(address.getCityId());
            this.addressList[i].setDistrictId(address.getDistrictId());
            this.addressList[i].setWardId(address.getWardId());
            this.addressList[i].setAddressDetail(address.getAddressDetail());
          }
        }
      }
    });
  }

  openAddAddressDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {
      edit: false
    }
    this.dialog.open(EditAccAddressComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result){
        this._snackBar.open("Thêm địa chỉ thành công", "Đóng", {
          duration: 2000,
        });
        let address:Address = result;
        this.addressList.push(address);
      }
    });
  }

  openChangePassDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "35%";
    dialogConfig.data = {
      edit: false
    }
    this.dialog.open(ChangePassComponent, dialogConfig).afterClosed().subscribe(result=>{
      if(result){
        this._snackBar.open("Thay đổi mật khẩu thành công", "Đóng", {
          duration: 2000,
        });
      }
    });
  }
}
