import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BussinessService } from '../service/bussiness.service';

@Component({
  selector: 'app-update-cash',
  templateUrl: './update-cash.component.html',
  styleUrls: ['./update-cash.component.css']
})
export class UpdateCashComponent implements OnInit {

  formUpdateCash: FormGroup;
  date: string;

  constructor(private bussinessService: BussinessService) { }

  ngOnInit(): void {
    this.formUpdateCash = new FormGroup(
      {
        '500k': new FormControl(''),
        '200k': new FormControl(''),
        '100k': new FormControl(''),
        '50k': new FormControl(''),
        '20k': new FormControl(''),
        '10k': new FormControl(''),
        '5k': new FormControl(''),
        '2k': new FormControl(''),
        '1k': new FormControl(''),
        '500': new FormControl(''),
      }
    )
    let currentDate = new Date();
    this.date = this.bussinessService.formatDate(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
  }

  onSubmit(){

  }

}
