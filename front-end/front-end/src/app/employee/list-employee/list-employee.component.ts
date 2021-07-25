import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/share/model/employee.model';
import { environment } from 'src/environments/environment.prod';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employee: Employee[];
  fullName: string;
  currentPage: number = 0;
  isMin: boolean = false;
  isMax: boolean = false;
  
  constructor(private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.empService.getAllEmployee(0).subscribe(resData => {
      this.employee = resData;
      console.log(resData);
    },
    errorMessage => {
    });
  }

  getAccountInfo(id: number){
    this.router.navigate(['/home/sua-nhan-vien/'+id]);
  }

  onDelete(id: number){
    this.empService.deleteEmpById(id).subscribe(res => {
    },
    errorMessage =>{
      for (var i = 0; i < this.employee.length; i++) {
        if (this.employee[i].getId() == id) {
          this.employee[i].toggleStatus();
        }
      }
    }
    );
  }

  minusCurrentPage(){
    if (this.currentPage == 0){
      this.isMin = true;
    }else{
      this.isMin = false;
      this.empService.getAllEmployee(this.currentPage - 1).subscribe(emp => {
        this.employee = emp;
        this.currentPage = this.currentPage - 1;
      })
    }
  }

  addCurrentPage(){
    this.empService.getAllEmployee(this.currentPage + 1).subscribe(emp => {
      this.employee = emp;
      this.currentPage = this.currentPage + 1;
    })
  }
}
