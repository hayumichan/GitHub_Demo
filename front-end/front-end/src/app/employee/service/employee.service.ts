import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { Address } from 'src/app/share/model/address.model';
import { Employee } from 'src/app/share/model/employee.model';
import { environment } from 'src/environments/environment.prod';

interface ResDataListEmp {
  data: [
    {
      id: string;
      username: string;
      firstName: string;
      middleName: string;
      lastName: string;
      email: string;
      phone: string;
      gender: string;
      dob: string;
      addressMappings: [{
        address: {
          id: string,
          city: {
            id: string,
            name: string
          },
          district: {
            id: string,
            name: string
          },
          ward: {
            id: string,
            name: string
          },
          detail: string
        }
      }
      ];
      userRoles: [{ role: { description: string } }];
      restaurantId: string;
      identificationNumber: string;
      active: boolean;
    }
  ]
}

interface ResDataEmp {
  id: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  addressMappings: [{
    address: {
      id: string,
      city: {
        id: string,
        name: string
      },
      district: {
        id: string,
        name: string
      },
      ward: {
        id: string,
        name: string
      },
      detail: string
    }
  }
  ];
  userRoles: [{ role: { description: string } }];
  restaurant: {
    id: string
  };
  identificationNumber: string;
  active: boolean;
}

interface ResDataAdd {
  id: string;
  name: string;
  type: string;
}

interface EditAddress {
  id: string;
  cityId: string;
  districtId: string;
  wardId: string;
  addressDetail: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  newEmployee: Employee;
  url: string = environment.apiUrl;
  submitedEmployee: Employee;

  constructor(private http: HttpClient, private router: Router) { }

  getAllEmployee(page: number) {
    let employee: Employee[] = [];
    return this.http.get<ResDataListEmp>(this.url + '/api/employee/get/all?page=' + page + '&size=20').pipe(map(emp => {
      for (var i = 0; i < emp.data.length; i++) {
        let rolesList: string[] = [];
        for (var j = 0; j < emp.data[i].userRoles.length; j++) {
          rolesList.push(emp.data[i].userRoles[j].role.description);
        }
        employee.push(new Employee(+emp.data[i].id, emp.data[i].firstName, emp.data[i].middleName, emp.data[i].lastName,
          emp.data[i].username, emp.data[i].email, emp.data[i].phone, emp.data[i].gender, emp.data[i].dob, [], rolesList, +emp.data[i].restaurantId, emp.data[i].identificationNumber, emp.data[i].active));
      };
      return employee;
    }
    ))
  }

  nameAssemble(firstName: string, middleName: string, lastName: string) {
    if (firstName == null) {
      firstName = '';
    }
    if (middleName == null) {
      middleName = '';
    }
    if (lastName == null) {
      lastName = '';
    }
    return firstName + " " + middleName + " " + lastName;
  }

  deleteEmpById(id: number) {
    return this.http.put(this.url + "/api/employee/delete/" + id,
      {}
    ).pipe(catchError(errorObject => {
      return throwError(errorObject.message);
    })
    );
  }

  getAllCity() {
    let cityList: AddressDetail[] = [];
    return this.http.get<ResDataAdd[]>(this.url + '/api/location/city/get/all').pipe(map(city => {
      for (var i = 0; i < city.length; i++) {
        cityList.push(new AddressDetail(city[i].id, city[i].name));
      }
      return cityList;
    }
    ))
  }

  getAllDistrictByCityId(id: string) {
    let districtList: AddressDetail[] = [];
    return this.http.get<ResDataAdd[]>(this.url + '/api/location/city/'+id+'/district/get/all').pipe(map(district => {
      for (var i = 0; i < district.length; i++) {
        districtList.push(new AddressDetail(district[i].id, district[i].name));
      }
      return districtList;
    }
    ))
  }

  getAllWardByDistrictId(id: string) {
    let wardList: AddressDetail[] = [];
    return this.http.get<ResDataAdd[]>(this.url + '/api/location/district/'+id+'/ward/get/all').pipe(map(ward => {
      for (var i = 0; i < ward.length; i++) {
        wardList.push(new AddressDetail(ward[i].id, ward[i].name));
      }
      return wardList;
    }
    ))
  }

  getAddressId(addressList: AddressDetail[], address: string) {
    for (var i = 0; i < addressList.length; i++) {
      if (addressList[i].getName() == address) {
        return addressList[i].getId();
      }
    }
    return '';
  }

  formatDate(date: number, month: number, year: number) {
    let newDate: string = '';
    let newMonth: string = '';
    if (date < 10) {
      newDate = '0' + date;
    } else {
      newDate = date + '';
    }
    if (month < 10) {
      newMonth = '0' + (month + 1);
    } else {
      newMonth = (month + 1) + '';
    }
    return year + '-' + newMonth + '-' + newDate;
  }

  createNewEmployee(username: string) {
    let roles: number[] = [];
    for (var i = 0; i < this.newEmployee.getRoles().length; i++) {
      if (this.newEmployee.getRoles()[i] === 'Quản lý nhà hàng') {
        roles.push(3);
      }
      if (this.newEmployee.getRoles()[i] === 'Kế toán') {
        roles.push(5);
      }
      if (this.newEmployee.getRoles()[i] === 'Thu ngân') {
        roles.push(6);
      }
      if (this.newEmployee.getRoles()[i] === 'Đầu bếp') {
        roles.push(7);
      }
      if (this.newEmployee.getRoles()[i] === 'Nhân viên tạp vụ') {
        roles.push(8);
      }
      if (this.newEmployee.getRoles()[i] === 'Phụ bếp') {
        roles.push(9);
      }
    }

    let newAddress: EditAddress[] = [];
    for (var i = 0; i < this.newEmployee.getAddress().length; i++) {
      let add: EditAddress = {
        id: this.newEmployee.getAddress()[i].getId(),
        cityId: this.newEmployee.getAddress()[i].getCityId().getId(),
        districtId: this.newEmployee.getAddress()[i].getDistrictId().getId(),
        wardId: this.newEmployee.getAddress()[i].getWardId().getId(),
        addressDetail: this.newEmployee.getAddress()[i].getAddressDetail()
      }
      newAddress.push(add);
    }

    this.http.post(this.url + '/api/employee/create',
      {
        username: username,
        firstName: this.newEmployee.getFirstName(),
        middleName: this.newEmployee.getMiddleName(),
        lastName: this.newEmployee.getLastName(),
        email: this.newEmployee.getEmail(),
        phone: this.newEmployee.getPhone(),
        dob: this.newEmployee.getDob(),
        gender: this.newEmployee.getSex(),
        identificationNumber: this.newEmployee.getIdentification(),
        addresses: newAddress,
        roles: roles,
        restaurantId: +this.newEmployee.getRestaurantId()
      }
    ).subscribe(res => {
    })
  }

  editEmployee(employee: Employee) {
    let roles: number[] = [];
    for (var i = 0; i < employee.getRoles().length; i++) {
      if (employee.getRoles()[i] === 'Quản lý nhà hàng') {
        roles.push(3);
      }
      if (employee.getRoles()[i] === 'Kế toán') {
        roles.push(5);
      }
      if (employee.getRoles()[i] === 'Thu ngân') {
        roles.push(6);
      }
      if (employee.getRoles()[i] === 'Đầu bếp') {
        roles.push(7);
      }
      if (employee.getRoles()[i] === 'Nhân viên tạp vụ') {
        roles.push(8);
      }
      if (employee.getRoles()[i] === 'Phụ bếp') {
        roles.push(9);
      }
    }

    let newAddress: EditAddress[] = [];
    for (var i = 0; i < this.newEmployee.getAddress().length; i++) {
      let add: EditAddress = {
        id: this.newEmployee.getAddress()[i].getId(),
        cityId: this.newEmployee.getAddress()[i].getCityId().getId(),
        districtId: this.newEmployee.getAddress()[i].getDistrictId().getId(),
        wardId: this.newEmployee.getAddress()[i].getWardId().getId(),
        addressDetail: this.newEmployee.getAddress()[i].getAddressDetail()
      }
      newAddress.push(add);
    }

    return this.http.put(this.url + '/api/employee/update',
      {
        username: employee.getUsername(),
        firstName: employee.getFirstName(),
        middleName: employee.getMiddleName(),
        lastName: employee.getLastName(),
        email: employee.getEmail(),
        phone: employee.getPhone(),
        dob: employee.getDob(),
        gender: employee.getSex(),
        identificationNumber: employee.getIdentification(),
        addresses: newAddress,
        roles: roles,
        restaurantId: +employee.getRestaurantId(),
        status: true
      }
    )
  }

  getEmpById(id: number) {
    let employee: Employee;
    return this.http.get<ResDataEmp>(this.url + '/api/employee/get/' + id).pipe(map(emp => {
      console.log(emp.restaurant.id);
      let rolesList: string[] = [];
      let addressList: Address[] = [];
      for (var j = 0; j < emp.userRoles.length; j++) {
        rolesList.push(emp.userRoles[j].role.description);
      }
      for (var k = 0; k < emp.addressMappings.length; k++) {
        addressList.push(new Address(emp.addressMappings[k].address.id,
          new AddressDetail(emp.addressMappings[k].address.city.id, emp.addressMappings[k].address.city.name),
          new AddressDetail(emp.addressMappings[k].address.district.id, emp.addressMappings[k].address.district.name),
          new AddressDetail(emp.addressMappings[k].address.ward.id, emp.addressMappings[k].address.ward.name), emp.addressMappings[k].address.detail));
      }
      employee = new Employee(+emp.id, emp.firstName, emp.middleName, emp.lastName,
        emp.username, emp.email, emp.phone, emp.gender, emp.dob, addressList, rolesList, +emp.restaurant.id, emp.identificationNumber, emp.active);
      return employee;
    }
    ))
  }
}
