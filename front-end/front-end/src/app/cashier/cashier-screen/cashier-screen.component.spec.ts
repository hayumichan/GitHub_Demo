import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierScreenComponent } from './cashier-screen.component';

describe('CashierScreenComponent', () => {
  let component: CashierScreenComponent;
  let fixture: ComponentFixture<CashierScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
