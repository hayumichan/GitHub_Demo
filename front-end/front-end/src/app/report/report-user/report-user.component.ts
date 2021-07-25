import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { YearMonth } from 'src/app/share/model/yearMonth.model';
import { YearMonthDate } from 'src/app/share/model/yearMonthDate.model';
import { ReportService } from '../service/report.service';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions;
  chartData: Array<[string, number]> = [];
  chartCategory: Array<string> = [];
  chartDataByDay: Array<number> = [];
  from: Date = new Date(2019, 8, 1);
  to: Date = new Date(2020, 4, 1);
  pick: string = "month";

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.genChartByMonth();
  }

  filter(){
    if(this.pick=="month"){
      this.genChartByMonth();
    }
    else{
      this.genChartByDay();
    }
  }

  genChartByMonth(){
    this.chartData = [];
    this.reportService.getAllUserInMonth(this.reportService.formatDate(this.from.getDate(), this.from.getMonth(), this.from.getFullYear()), this.reportService.formatDate(this.to.getDate(), this.to.getMonth(), this.to.getFullYear())).subscribe(res=>{
      let yearMonth:YearMonth[] = this.reportService.getYearMonths(this.from, this.to);
      let data: YearMonth[] = [];
      for (var i = 0; i< res.length; i++){
        for (var j = 0; j < res[i].months.length; j++){
          data.push(new YearMonth(res[i].year, res[i].months[j].month, res[i].months[j].count));
        }
      }
      for (var i = 0; i<yearMonth.length; i++){
        for (var j = 0; j<data.length; j++){
          if (yearMonth[i].getYearMonth() === data[j].getYearMonth()){
            yearMonth[i].setCount(data[j].getCount());
          }
        }
      }
      for(var i=0;i<yearMonth.length;i++){
        this.chartData.push(['Tháng '+yearMonth[i].getMonths()+' năm '+yearMonth[i].getYear(), yearMonth[i].getCount()])
      }
      this.chartOptions = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Số lượng tài khoản đã tạo'
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: -45,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Population (millions)'
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          pointFormat: 'Số lượng tài khoản'
        },
        series: [{
          name: 'Population',
          data: this.chartData,
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        }]
      }
    });
  }

  genChartByDay(){
    this.chartDataByDay = [];
    this.chartCategory = [];
    this.reportService.getAllUserInDay(this.reportService.formatDate(this.from.getDate(), this.from.getMonth(), this.from.getFullYear()), this.reportService.formatDate(this.to.getDate(), this.to.getMonth(), this.to.getFullYear())).subscribe(res=>{
      let yearMonth:YearMonthDate[] = this.reportService.getYearMonthDate(this.from, this.to);
      let data: YearMonthDate[] = [];
      for (var i = 0; i< res.length; i++){
        for (var j = 0; j < res[i].months.length; j++){
          for (var k=0;k<res[i].months[j].days.length; k++){
            data.push(new YearMonthDate(res[i].year, res[i].months[j].month, res[i].months[j].days[k].day,res[i].months[j].days[k].count));
          }
        }
      }
      for (var i = 0; i<yearMonth.length; i++){
        for (var j = 0; j<data.length; j++){
          if (yearMonth[i].getYearMonthDate() === data[j].getYearMonthDate()){
            yearMonth[i].setCount(data[j].getCount());
          }
        }
      }
      for(var i=0;i<yearMonth.length;i++){
        if(i==0||i==yearMonth.length-1){
          this.chartCategory.push(yearMonth[i].getYearMonthDate());
        }else{
          this.chartCategory.push('');
        }
        this.chartDataByDay.push(yearMonth[i].getCount());
      }
      this.chartOptions = {
        chart: {
          type: 'line'
      },
      subtitle: {
          text: 'Source: WorldClimate.com'
      },
      xAxis: {
          categories: this.chartCategory
      },
      yAxis: {
          title: {
              text: 'Số lượng tài khoản'
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: true
          }
      },
      series: [{
          data: this.chartDataByDay
      }]
      }
    });
  }
}
