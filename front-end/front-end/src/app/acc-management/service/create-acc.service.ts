import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from 'src/app/share/model/account.model';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { Address } from 'src/app/share/model/address.model';
import { Role } from 'src/app/share/model/role.model';
import { UserDetail } from 'src/app/share/model/user-detail.model';
import { environment } from '../../../environments/environment.prod';
import { AccountEdit } from '../manage-acc/manage-acc.component';

interface ResponseData {
  content: [{
    id: string;
    active: boolean;
    createdDate: string;
    userRoles: [{ role: { description: string } }];
    username: string;
  }];
}

interface ResDataAcc {
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
  identificationNumber: string;
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
interface AddAddress {
  cityId: string;
  districtId: string;
  wardId: string;
  addressDetail: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateAccService {

  url: string = environment.apiUrl;
  userData = JSON.parse(localStorage.getItem('userData'));
  token = this.userData.token;

  constructor(private http: HttpClient) {
  }

  createAcc(username: string, password: string) {
    return this.http.post(this.url + '/api/account/create',
      {
        username: username,
        password: password
      }
    ).pipe(catchError(errorObject => {
      return throwError(errorObject.message);
    })
    );
  }

  getAllAcc(page: number) {
    let account: Account[] = [];
    return this.http.get<ResponseData>(this.url + '/api/account/get/all?page=' + page + '&size=20').pipe(map(acc => {
      console.log(acc);
      for (var i = 0; i < acc.content.length; i++) {
        let rolesList: string[] = [];
        for (var j = 0; j < acc.content[i].userRoles.length; j++) {
          rolesList.push(acc.content[i].userRoles[j].role.description);
        }
        account.push(new Account(+acc.content[i].id, acc.content[i].username, acc.content[i].createdDate, acc.content[i].active, rolesList));
      };
      return account;
    }
    ))
  }

  deleteAccById(id: number) {
    return this.http.put(this.url + "/api/account/deactivate",
      {
        id: id,
      }
    ).pipe(catchError(errorObject => {
      return throwError(errorObject.message);
    })
    );
  }

  changePassword(username: string, password: string) {
    this.http.put(this.url + "/api/account/change-password",
      {
        username: username,
        password: password
      }
    ).subscribe(res => {
    })
  }

  getAccByUsername(username: string) {
    let userDetail: UserDetail;
    return this.http.get<ResDataAcc>(this.url + "/api/account/get/by-username/" + username).pipe(map(acc => {
      let addressList: Address[] = [];
      for (var k = 0; k < acc.addressMappings.length; k++) {
        addressList.push(new Address(acc.addressMappings[k].address.id,
          new AddressDetail(acc.addressMappings[k].address.city.id, acc.addressMappings[k].address.city.name),
          new AddressDetail(acc.addressMappings[k].address.district.id, acc.addressMappings[k].address.district.name),
          new AddressDetail(acc.addressMappings[k].address.ward.id, acc.addressMappings[k].address.ward.name), acc.addressMappings[k].address.detail));
      }
      userDetail = new UserDetail(+acc.id, acc.firstName, acc.middleName, acc.lastName,
        acc.username, acc.email, acc.phone, acc.gender, acc.dob, addressList, acc.identificationNumber);
      return userDetail;
    }
    ))
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

  editAccount(account: AccountEdit) {
    return this.http.put(this.url + "/api/account/update",
      {
        id: JSON.parse(localStorage.getItem('userData')).userId,
        firstName: account.firstName,
        middleName: account.middleName,
        lastName: account.lastName,
        email: account.email,
        gender: account.sex,
        dob: account.dob,
        identificationNumber: account.identidficationNumber,
        phone: account.phone
      }
    ).pipe(catchError(errorObject => {
      return throwError(errorObject);
    })
    );
  }

  editAccountAddress(address: Address) {
    let editedAddress: EditAddress[] = [];
    let newAddress: EditAddress = {
      id: address.getId(),
      cityId: address.getCityId().getId(),
      districtId: address.getDistrictId().getId(),
      wardId: address.getWardId().getId(),
      addressDetail: address.getAddressDetail()
    }
    editedAddress.push(newAddress);
    return this.http.put(this.url + "/api/account/update",
      {
        id: JSON.parse(localStorage.getItem('userData')).userId,
        addresses: editedAddress
      }).subscribe(res => {
      })
  }

  addAccountAddress(address: Address) {
    let editedAddress: AddAddress[] = [];
    let newAddress: AddAddress = {
      cityId: address.getCityId().getId(),
      districtId: address.getDistrictId().getId(),
      wardId: address.getWardId().getId(),
      addressDetail: address.getAddressDetail()
    }
    editedAddress.push(newAddress);
    return this.http.put(this.url + "/api/account/update",
      {
        id: JSON.parse(localStorage.getItem('userData')).userId,
        addresses: editedAddress
      }).subscribe(res => {
      })
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

  changePass(username: string, oldPass: string, newPass: string) {
    return this.http.put(this.url + '/api/account/change-password',
      {
        username: username,
        password: oldPass,
        newPassword: newPass
      }
    ).pipe(catchError(errorObject => {
      return throwError(errorObject.error.statusCode);
    })
    );
  }

}

