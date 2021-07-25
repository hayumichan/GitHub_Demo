import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentVoucherComponent } from './create-payment-voucher.component';

describe('CreatePaymentVoucherComponent', () => {
  let component: CreatePaymentVoucherComponent;
  let fixture: ComponentFixture<CreatePaymentVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaymentVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
