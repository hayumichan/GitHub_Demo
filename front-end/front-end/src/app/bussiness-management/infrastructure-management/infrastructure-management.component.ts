import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePassComponent } from 'src/app/acc-management/change-pass/change-pass.component';
import { ConfirmDialogComponent } from 'src/app/share/confirm-dialog/confirm-dialog.component';
import { ModifyInfrastructureListComponent } from '../modify-infrastructure-list/modify-infrastructure-list.component';
import { BussinessService, Infrastructure } from '../service/bussiness.service';

@Component({
  selector: 'app-infrastructure-management',
  templateUrl: './infrastructure-management.component.html',
  styleUrls: ['./infrastructure-management.component.css']
})
export class InfrastructureManagementComponent implements OnInit {

  currentPage: number = 0;
  infraList: Infrastructure[];

  constructor(private bussinessService: BussinessService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.infraList = this.bussinessService.getAllInfrastructure();
  }

  openAddInfraDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      edit: false
    }
    this.dialog.open(ModifyInfrastructureListComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result) {
        this.infraList.push(result);
        this._snackBar.open("Thêm thành công", "Đóng", {
          duration: 2000,
        });
      }
    });
  }

  openEditInfraDialog(infrastructure: Infrastructure) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = {
      infra: infrastructure,
      edit: true
    }
    this.dialog.open(ModifyInfrastructureListComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result) {
        for (var i = 0; i < this.infraList.length; i++) {
          if (result.id == this.infraList[i].id) {
            this.infraList[i].name = result.name;
            this.infraList[i].quantity = result.quantity;
            this.infraList[i].importDate = result.importDate;
            this.infraList[i].price = result.price;
            this.infraList[i].supplier = result.supplier;
            this.infraList[i].depreciation = result.depreciation;
          }
        }
        this._snackBar.open("Sửa thành công", "Đóng", {
          duration: 2000,
        });
      }
    });
  }

  minusCurrentPage() {

  }

  addCurrentPage() {

  }

  deleteInfra(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    dialogConfig.data = {
      message: 'Bạn có chắc chắn muốn xóa dòng này?'
    }
    this.dialog.open(ConfirmDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result) {
        for (var i = 0; i < this.infraList.length; i++) {
          if (this.infraList[i].id == id) {
            this.infraList.splice(i, 1);
          }
        }
        this._snackBar.open("Xóa thành công", "Đóng", {
          duration: 2000,
        });
      }
    });
  }
}
