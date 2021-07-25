import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccComponent } from './list-acc.component';

describe('ListAccComponent', () => {
  let component: ListAccComponent;
  let fixture: ComponentFixture<ListAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
