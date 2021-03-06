import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureManagementComponent } from './infrastructure-management.component';

describe('InfrastructureManagementComponent', () => {
  let component: InfrastructureManagementComponent;
  let fixture: ComponentFixture<InfrastructureManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfrastructureManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfrastructureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
