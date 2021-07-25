import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/authentication/service/auth.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  roles: string[];
  fullName: string;
  restaurant: string[] = [];
  
  constructor(private share: ServiceService, private router: Router) {
  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    this.fullName = userData.fullName;
    this.roles = userData.authorities;
    this.share.getAllRestaurant().subscribe(res=>{
      for (var i = 0; i<res.length; i++){
        this.restaurant.push(res[i].name);
      }
    })
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/dang-nhap']);
  }

  toggleSidenav(){
    this.share.sidebarToggler.emit();
  }
  
}
