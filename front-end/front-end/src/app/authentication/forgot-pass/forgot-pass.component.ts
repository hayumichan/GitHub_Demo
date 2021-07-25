import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  formForgotPass: FormGroup;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formForgotPass = new FormGroup(
      {
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required])
      }
    );
  }

  onSubmit(){
    this.authService.forgotPassword(this.formForgotPass.value['username'], this.formForgotPass.value['email'])
    .subscribe(
      resData => {
      },
      errorMessage => {
        this._snackBar.open("Đổi mật khẩu thành công", "Đóng", {
          duration: 2000,
        });
      }
    );;
  }


}
