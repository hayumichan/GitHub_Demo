import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AddressDetail } from 'src/app/share/model/address-detail.model';
import { environment } from 'src/environments/environment.prod';

interface ResDataAdd {
  id: string;
  name: string;
  type: string;
}

export interface LossAndProfit {
  material: string;
  revenue: number;
  paid: number;
  debt_supplier: number;
}

export interface Cash {
  date: string;
  description: string;
  earn: number,
  paid: number,
  remain: number
}

export class Infrastructure {
  id: number;
  name: string;
  quantity: number;
  importDate: string;
  price: number;
  supplier: string;
  depreciation: number;
}

@Injectable({
  providedIn: 'root'
})
export class BussinessService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLossAndProfit() {
    let lossAndProfitList: LossAndProfit[] = [
      {
        material: 'Bò',
        revenue: 1243,
        paid: 123,
        debt_supplier: 12
      },
      {
        material: 'Bò',
        revenue: 1243,
        paid: 123,
        debt_supplier: 12
      },
      {
        material: 'Bò',
        revenue: 1243,
        paid: 123,
        debt_supplier: 12
      },
      {
        material: 'Bò',
        revenue: 1243,
        paid: 123,
        debt_supplier: 12
      },
      {
        material: 'Bò',
        revenue: 1243,
        paid: 123,
        debt_supplier: 12
      },
      {
        material: 'Bò',
        revenue: 1243,
        paid: 123,
        debt_supplier: 12
      },
    ]
    return lossAndProfitList;
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
    return newDate + '/' + newMonth + '/' + year;
  }

  getCash() {
    let cash: Cash[] = [
      {
        date: "01/09/2020",
        description: "Thu ca sáng",
        earn: 11022500,
        paid: 0,
        remain: 11022500
      },
      {
        date: "01/09/2020",
        description: "Chi ca sáng",
        earn: 0,
        paid: 1262000,
        remain: 9760500
      },
      {
        date: "01/09/2020",
        description: "Thu ca chiều",
        earn: 1530000,
        paid: 0,
        remain: 11290500
      },
      {
        date: "01/09/2020",
        description: "Chi ca chiều",
        earn: 0,
        paid: 0,
        remain: 11290500
      },
      {
        date: "01/09/2020",
        description: "Thu ca sáng",
        earn: 11022500,
        paid: 0,
        remain: 11022500
      },
      {
        date: "01/09/2020",
        description: "Chi ca sáng",
        earn: 0,
        paid: 1262000,
        remain: 9760500
      },
      {
        date: "01/09/2020",
        description: "Thu ca chiều",
        earn: 1530000,
        paid: 0,
        remain: 11290500
      },
      {
        date: "01/09/2020",
        description: "Chi ca chiều",
        earn: 0,
        paid: 0,
        remain: 11290500
      },
      {
        date: "01/09/2020",
        description: "Thu ca sáng",
        earn: 11022500,
        paid: 0,
        remain: 11022500
      },
      {
        date: "01/09/2020",
        description: "Chi ca sáng",
        earn: 0,
        paid: 1262000,
        remain: 9760500
      },
      {
        date: "01/09/2020",
        description: "Thu ca chiều",
        earn: 1530000,
        paid: 0,
        remain: 11290500
      },
      {
        date: "01/09/2020",
        description: "Chi ca chiều",
        earn: 0,
        paid: 0,
        remain: 11290500
      },

    ]
    return cash;
  }

  getAllInfrastructure() {
    let infList: Infrastructure[] = [
      {
        id: 1,
        name: 'Bàn ghế 1',
        quantity: 20,
        importDate: '25/07/2020',
        supplier: 'Xuân Hòa',
        price: 30000000,
        depreciation: 72
      },
      {
        id: 2,
        name: 'Bàn ghế 2',
        quantity: 20,
        importDate: '25/07/2020',
        supplier: 'Xuân Hòa',
        price: 30000000,
        depreciation: 72
      },
      {
        id: 3,
        name: 'Bàn ghế 3',
        quantity: 20,
        importDate: '25/07/2020',
        supplier: 'Xuân Hòa',
        price: 30000000,
        depreciation: 72
      },
      {
        id: 4,
        name: 'Bàn ghế 4',
        quantity: 20,
        importDate: '25/07/2020',
        supplier: 'Xuân Hòa',
        price: 30000000,
        depreciation: 72
      },
      {
        id: 5,
        name: 'Bàn ghế 5',
        quantity: 20,
        importDate: '25/07/2020',
        supplier: 'Xuân Hòa',
        price: 30000000,
        depreciation: 72
      },
      {
        id: 6,
        name: 'Bàn ghế 6',
        quantity: 20,
        importDate: '25/07/2020',
        supplier: 'Xuân Hòa',
        price: 30000000,
        depreciation: 72
      },
    ]
    return infList;
  }

}
