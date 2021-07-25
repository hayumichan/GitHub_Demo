import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccComponent } from './edit-acc.component';

describe('EditAccComponent', () => {
  let component: EditAccComponent;
  let fixture: ComponentFixture<EditAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
