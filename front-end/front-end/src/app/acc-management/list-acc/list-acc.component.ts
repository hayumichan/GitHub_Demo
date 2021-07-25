import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/share/model/account.model';
import { CreateAccService } from '../service/create-acc.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CreateAccComponent } from '../create-acc/create-acc.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-acc',
  templateUrl: './list-acc.component.html',
  styleUrls: ['./list-acc.component.css']
})
export class ListAccComponent implements OnInit {

  account: Account[] = [];
  currentPage: number = 0;
  isMin: boolean = false;
  isMax: boolean = false;

  constructor(private cretateAcc: CreateAccService, private http: HttpClient, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cretateAcc.getAllAcc(0).subscribe(acc => {
      console.log(acc);
      this.account = acc;
    })
  }

  onDelete(id: number) {
    this.cretateAcc.deleteAccById(id).subscribe(res => {
    },
    errorMessage =>{
      for (var i = 0; i < this.account.length; i++) {
        if (this.account[i].getId() == id) {
          this.account[i].toggleActive();
        }
      }
    }
    );
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "35%";
    this.dialog.open(CreateAccComponent, dialogConfig).afterClosed().subscribe(result => {
      this._snackBar.open("Thêm tài khoản thành công", "Đóng", {
        duration: 2000,
      });
    });
  }

  minusCurrentPage(){
    if (this.currentPage == 0){
      this.isMin = true;
    }else{
      this.isMin = false;
      this.cretateAcc.getAllAcc(this.currentPage - 1).subscribe(acc => {
        this.account = acc;
        this.currentPage = this.currentPage - 1;
      })
    }
  }

  addCurrentPage(){
    this.cretateAcc.getAllAcc(this.currentPage + 1).subscribe(acc => {
      this.account = acc;
      this.currentPage = this.currentPage + 1;
    })
  }

}
