import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-username',
  templateUrl: './add-username.component.html',
  styleUrls: ['./add-username.component.css']
})
export class AddUsernameComponent implements OnInit {

  username: string;

  constructor(private empService: EmployeeService,  private dialogRef: MatDialogRef<AddEmployeeComponent>) { }

  ngOnInit(): void {
  }

  addEmp(){
    this.empService.createNewEmployee(this.username);
    this.dialogRef.close('ahihi');
  }

}
