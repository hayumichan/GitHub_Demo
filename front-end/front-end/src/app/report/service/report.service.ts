import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YearMonth } from 'src/app/share/model/yearMonth.model';
import { YearMonthDate } from 'src/app/share/model/yearMonthDate.model';
import { environment } from 'src/environments/environment.prod';

interface ResData {
  year: number;
  months: [
    {
      month: number,
      days: [
        {
          day: number,
          count: number,
        }
      ],
      count: number
    }
  ],
  count: number
}

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUserInMonth(from: string, to: string) {
    return this.http.get<ResData[]>(this.url + '/api/report/registered-customer?from=' + from + '&to=' + to + '&by-day=false');
  }

  getAllUserInDay(from: string, to: string) {
    return this.http.get<ResData[]>(this.url + '/api/report/registered-customer?from=' + from + '&to=' + to + '&by-day=true');
  }

  getYearMonths(startDate: Date, stopDate: Date) {
    var monthsArray: YearMonth[] = [];
    var currentDate = startDate;
    var oldMonth;
    while (currentDate <= stopDate) {
      let month: number = new Date(currentDate).getMonth() + 1;
      if (month == 13) {
        month = 1;
      } 
      if (oldMonth != month) {
        monthsArray.push(new YearMonth(new Date(currentDate).getFullYear(), month, 0));
      }
      oldMonth = month;
      currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    }
    return monthsArray;
  }

  getYearMonthDate(startDate: Date, stopDate: Date){
    var monthsArray: YearMonthDate[] = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      let month: number = new Date(currentDate).getMonth() + 1;
      if (month == 13) {
        month = 1;
      } 
        monthsArray.push(new YearMonthDate(new Date(currentDate).getFullYear(), month, new Date(currentDate).getDate() , 0));
      currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    }
    return monthsArray;
  }

  formatDate(date: number, month: number, year: number) {
    let newDate: string = '';
    let newMonth: string = '';
    if (date < 10) {
      newDate = '0' + date;
    } else {
      newDate = date + '';
    }
    if (month < 9) {
      newMonth = '0' + (month + 1);
    } else if (month == 11) {
      newMonth = '12';
    } else if (month == 0) {
      newMonth = '1'
    } else {
      newMonth = (month + 1) + '';
    }
    return year + '-' + newMonth + '-' + newDate;
  }

}
