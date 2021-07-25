import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccAddressComponent } from './edit-acc-address.component';

describe('EditAccAddressComponent', () => {
  let component: EditAccAddressComponent;
  let fixture: ComponentFixture<EditAccAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
