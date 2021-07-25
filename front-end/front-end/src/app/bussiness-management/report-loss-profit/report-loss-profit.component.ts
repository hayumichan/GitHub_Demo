import { Component, OnInit } from '@angular/core';
import { BussinessService, LossAndProfit } from '../service/bussiness.service';

@Component({
  selector: 'app-report-loss-profit',
  templateUrl: './report-loss-profit.component.html',
  styleUrls: ['./report-loss-profit.component.css']
})
export class ReportLossProfitComponent implements OnInit {

  lossAndProfitList: LossAndProfit[];

  constructor(private bussinessService: BussinessService) { }

  ngOnInit(): void {
    this.lossAndProfitList = this.bussinessService.getLossAndProfit();
  }

}
