import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyntServiceRequestComponent } from './mynt-service-request.component';

describe('MyntServiceRequestComponent', () => {
  let component: MyntServiceRequestComponent;
  let fixture: ComponentFixture<MyntServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyntServiceRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyntServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
