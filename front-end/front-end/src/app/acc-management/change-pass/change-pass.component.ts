import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageAccountComponent } from '../manage-acc/manage-acc.component';
import { CreateAccService } from '../service/create-acc.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  errorMessage: string = null;
  hide = true;
  formChangePass: FormGroup;
  username: string;

  constructor(private accService: CreateAccService, private dialogRef: MatDialogRef<ManageAccountComponent>) { }

  ngOnInit(): void {
    this.formChangePass = new FormGroup(
      {
        'old-pass': new FormControl(null, [Validators.required]),
        'new-pass': new FormControl(null, [Validators.required]),
        'confirm': new FormControl(null, [Validators.required]),
      }
    )
    this.username = JSON.parse(localStorage.getItem('userData')).username
  }

  onSubmit() {
    if (this.formChangePass.invalid) {
      this.errorMessage = "Xin vui lòng điền đầy đủ tất cả các trường";
    } else if (this.formChangePass.value['new-pass'] != this.formChangePass.value['confirm']) {
      this.errorMessage = "Mật khẩu mới và Nhập lại mật khẩu không trùng nhau";
    } else {
      this.accService.changePass(this.username, this.formChangePass.value['old-pass'], this.formChangePass.value['new-pass'])
        .subscribe(res => {
          console.log(res);
        },
          errorMessage => {
            if (errorMessage == 403) {
              this.errorMessage = "Mật khẩu cũ không chính xác";
            }
            else{
              this.dialogRef.close('ahehe');
            }
          }
        )
    }
  }

}
