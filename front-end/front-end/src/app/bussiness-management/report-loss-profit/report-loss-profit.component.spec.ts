import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLossProfitComponent } from './report-loss-profit.component';

describe('ReportLossProfitComponent', () => {
  let component: ReportLossProfitComponent;
  let fixture: ComponentFixture<ReportLossProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLossProfitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLossProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
