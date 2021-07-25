import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/share/model/user.model';
import { environment } from '../../../environments/environment.prod';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { RegisterData } from '../register/register.component';

interface ResponseData {
  username: string;
  authorities: [];
  token: string;
}

interface ResDataAdd {
  id: string;
  name: string;
  type: string;
}

interface EditAddress {
  cityId: string;
  districtId: string;
  wardId: string;
  addressDetail: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  isAuth: boolean = false;
  token: string;

  url: string = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
  }

  logIn(username: string, password: string) {
    return this.http.post<ResponseData>(this.url + '/api/auth/login',
      {
        username: username,
        password: password
      }
    ).pipe(catchError(errorObject => {
      console.log(errorObject)
      switch (errorObject.error.error) {
        case 'Not Found':
          return throwError('User not found');
        default:
          return throwError('An unknown error occured');
      }
    }), tap(
      resData => {
        this.user.next(new User(resData.username, resData.authorities, resData.token));
        this.isAuth = true;
        this.token = resData.token;
        localStorage.setItem('userData', JSON.stringify(resData));
      }
    )
    );
  }

  autoLoginWhenReload() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    this.isAuth = true;
    this.token = userData.token;
    this.user.next(new User(userData.username, userData.authorities, userData.token));
  }

  forgotPassword(username: string, email: string) {
    return this.http.post(this.url + '/api/account/forgot-password',
      {
        username: username,
        email: email
      }
    ).pipe(catchError(errorObject => {
      console.log(errorObject)
      return throwError('Username or password is incorrect');
    }), tap(
      resData => {
        console.log(resData);
      }
    )
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
    return this.http.get<ResDataAdd[]>(this.url + '/api/location/city/' + id + '/district/get/all').pipe(map(district => {
      for (var i = 0; i < district.length; i++) {
        districtList.push(new AddressDetail(district[i].id, district[i].name));
      }
      return districtList;
    }
    ))
  }

  getAllWardByDistrictId(id: string) {
    let wardList: AddressDetail[] = [];
    return this.http.get<ResDataAdd[]>(this.url + '/api/location/district/' + id + '/ward/get/all').pipe(map(ward => {
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

  register(customer: RegisterData) {
    let newAddress: EditAddress[] = [];
    for (var i = 0; i < customer.addressList.length; i++) {
      let add: EditAddress = {
        cityId: customer.addressList[i].getCityId().getId(),
        districtId: customer.addressList[i].getDistrictId().getId(),
        wardId: customer.addressList[i].getWardId().getId(),
        addressDetail: customer.addressList[i].getAddressDetail()
      }
      newAddress.push(add);
    }
    return this.http.post(this.url + '/api/account/register',
      {
        username: customer.username,
        password: customer.password,
        firstName: customer.firstName,
        middleName: customer.middleName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        addresses: newAddress,
        gender: customer.sex,
        dob: customer.dob,
        identificationNumber: customer.identification
      }
    )
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
}
