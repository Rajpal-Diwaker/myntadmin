import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyntCustomerComponent } from './mynt-customer.component';

describe('MyntCustomerComponent', () => {
  let component: MyntCustomerComponent;
  let fixture: ComponentFixture<MyntCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyntCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyntCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
