import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isOpen:boolean =  false;

  constructor(private share: ServiceService) {
    this.share.sidebarToggler.subscribe(()=>{
      this.isOpen = !this.isOpen;
    })
   }

  ngOnInit(): void {
  }

}
