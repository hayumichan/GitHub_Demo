import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InfrastructureManagementComponent } from '../infrastructure-management/infrastructure-management.component';
import { BussinessService, Infrastructure } from '../service/bussiness.service';

@Component({
  selector: 'app-modify-infrastructure-list',
  templateUrl: './modify-infrastructure-list.component.html',
  styleUrls: ['./modify-infrastructure-list.component.css']
})
export class ModifyInfrastructureListComponent implements OnInit {

  formModifyInfrastructure: FormGroup = new FormGroup(
    {
      'name': new FormControl('', [Validators.required]),
      'quantity': new FormControl('', [Validators.required]),
      'importDate': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'supplier': new FormControl('', [Validators.required]),
      'depreciation': new FormControl('', [Validators.required]),
    }
  );

  constructor(@Inject(MAT_DIALOG_DATA) public data: { infra: Infrastructure, edit: boolean }, private dialogRef: MatDialogRef<InfrastructureManagementComponent>, private bussinessService: BussinessService) { }

  ngOnInit(): void {
    if (this.data.edit) {
      let ngay = this.data.infra.importDate.substring(0, this.data.infra.importDate.indexOf('/'));
      let thang = this.data.infra.importDate.substring(this.data.infra.importDate.indexOf('/') + 1, this.data.infra.importDate.lastIndexOf('/'));
      let nam = this.data.infra.importDate.substr(this.data.infra.importDate.lastIndexOf('/') + 1);
      this.formModifyInfrastructure = new FormGroup(
        {
          'name': new FormControl(this.data.infra.name, [Validators.required]),
          'quantity': new FormControl(this.data.infra.quantity, [Validators.required]),
          'importDate': new FormControl(new Date(+nam, +thang - 1, +ngay), [Validators.required]),
          'price': new FormControl(this.data.infra.price, [Validators.required]),
          'supplier': new FormControl(this.data.infra.supplier, [Validators.required]),
          'depreciation': new FormControl(this.data.infra.depreciation, [Validators.required]),
        }
      );
    }
  }

  onSubmit() {
    if(!this.data.edit){
      let infrastructure: Infrastructure = {
        id: 1,
        name: this.formModifyInfrastructure.value['name'],
        quantity: this.formModifyInfrastructure.value['quantity'],
        importDate: this.bussinessService.formatDate(this.formModifyInfrastructure.value['importDate'].getDate(), this.formModifyInfrastructure.value['importDate'].getMonth(), this.formModifyInfrastructure.value['importDate'].getFullYear()),
        price: this.formModifyInfrastructure.value['price'],
        supplier: this.formModifyInfrastructure.value['supplier'],
        depreciation: this.formModifyInfrastructure.value['depreciation'],
      }
      this.dialogRef.close(infrastructure);
    } else{
      let infrastructure: Infrastructure = {
        id: this.data.infra.id,
        name: this.formModifyInfrastructure.value['name'],
        quantity: this.formModifyInfrastructure.value['quantity'],
        importDate: this.bussinessService.formatDate(this.formModifyInfrastructure.value['importDate'].getDate(), this.formModifyInfrastructure.value['importDate'].getMonth(), this.formModifyInfrastructure.value['importDate'].getFullYear()),
        price: this.formModifyInfrastructure.value['price'],
        supplier: this.formModifyInfrastructure.value['supplier'],
        depreciation: this.formModifyInfrastructure.value['depreciation'],
      }
      this.dialogRef.close(infrastructure);
    }
  }

}
