import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditAccAddressComponent } from 'src/app/acc-management/edit-acc-address/edit-acc-address.component';
import { BussinessService, Cash } from '../service/bussiness.service';
import { UpdateCashComponent } from '../update-cash/update-cash.component';

@Component({
  selector: 'app-cash-management',
  templateUrl: './cash-management.component.html',
  styleUrls: ['./cash-management.component.css']
})
export class CashManagementComponent implements OnInit {

  cashList: Cash[];
  currentPage: number = 0;

  constructor(private bussinessService: BussinessService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cashList = this.bussinessService.getCash();
  }

  minusCurrentPage(){

  }

  addCurrentPage(){

  }

  updateCash(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(UpdateCashComponent, dialogConfig).afterClosed().subscribe(result => {

    })
  }

}
