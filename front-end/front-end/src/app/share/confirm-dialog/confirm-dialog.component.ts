import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InfrastructureManagementComponent } from 'src/app/bussiness-management/infrastructure-management/infrastructure-management.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: { message: string }, private dialogRef: MatDialogRef<InfrastructureManagementComponent>) { }

  ngOnInit(): void {
    this.message = this.data.message;
  }
  confirm(result: boolean){
    this.dialogRef.close(result);
  }

}
