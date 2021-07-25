import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInfrastructureListComponent } from './modify-infrastructure-list.component';

describe('ModifyInfrastructureListComponent', () => {
  let component: ModifyInfrastructureListComponent;
  let fixture: ComponentFixture<ModifyInfrastructureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyInfrastructureListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyInfrastructureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
