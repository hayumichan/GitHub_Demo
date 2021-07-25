import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/service/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  role: string = null;
  isOwner: boolean = false;
  isKeToan: boolean = false;
  isThuNgan: boolean = false;
  isAdmin: boolean = false;
  isCustomer: boolean = false;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      for (var i = 0; i < user.getRole().length; i++) {
        if (user.getRole()[i] === 'SYSTEM_ADMINISTRATOR') {
          this.isAdmin = true;
        } else if (user.getRole()[i] === 'RESTAURANT_OWNER') {
          this.isOwner = true;
        } else if (user.getRole()[i] === 'ACCOUNTANT') {
          this.isKeToan = true;
        } else if (user.getRole()[i] === 'CASHIER') {
          this.isThuNgan = true;
        } else if (user.getRole()[i] === 'CUSTOMER') {
          this.isCustomer = true;
        }
      }
    });
  }

}
