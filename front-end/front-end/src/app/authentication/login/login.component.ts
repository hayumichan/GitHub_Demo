import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isValid: boolean = true;
  formLogin: FormGroup;
  isLoading: boolean = false;
  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        'username': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      }
    );
  }

  onSubmit() {
    if (this.formLogin.value['username'] == null || this.formLogin.value['password'] == null || this.formLogin.value['username'] == '' || this.formLogin.value['password'] == '') {
      this.isValid = false;
    } else {
      this.isValid = true;
      this.isLoading = true;
      this.authService.logIn(this.formLogin.value['username'], this.formLogin.value['password']).subscribe(
        resData => {
          this.isLoading = false;
          const userData = JSON.parse(localStorage.getItem('userData'));
          for(var i =0; i<userData.authorities.length;i++){
            if (userData.authorities[i]==='RESTAURANT_OWNER'){
              this.router.navigate(['/home/danh-sach-nhan-vien']);
            } else if (userData.authorities[i] === 'SYSTEM_ADMINISTRATOR') {
              this.router.navigate(['/home/danh-sach-tai-khoan']);
            } else if (userData.authorities[i] === 'ACCOUNTANT') {
              this.router.navigate(['/home/bao-cao']);
            } else if (userData.authorities[i] === 'CASHIER') {
              this.router.navigate(['/home/thu-ngan']);
            } else if (userData.authorities[i] === 'CUSTOMER') {
              this.router.navigate(['/home/trang-chu']);
            }
          }
          
        },
        errorMessage => {
          this.isLoading = false;
          this._snackBar.open("Tên đăng nhập hoặc mật khẩu không chính xác, vui lòng thử lại", "Đóng", {
            duration: 2000,
          });
          ;
        }
      );
    }
  }

}
