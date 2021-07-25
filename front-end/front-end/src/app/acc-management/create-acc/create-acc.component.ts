import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ListAccComponent } from '../list-acc/list-acc.component';
import { CreateAccService } from '../service/create-acc.service';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.css']
})
export class CreateAccComponent implements OnInit {

  hide = true;
  formCreateAcc: FormGroup;
  errorMessage: string;
  constructor(private service: CreateAccService, private dialogRef: MatDialogRef<ListAccComponent>) { }

  ngOnInit(): void {
    this.formCreateAcc = new FormGroup(
      {
        'username': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      }
    );
  }

  onSubmit() {
    this.service.createAcc(this.formCreateAcc.value['username'], this.formCreateAcc.value['password'])
      .subscribe(user => {
      },
        errorMessage => {
          this.errorMessage = errorMessage;
          this.dialogRef.close('ahihi');
        })
  }
}
