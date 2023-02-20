import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyntWeddingEnquiriesComponent } from './mynt-wedding-enquiries.component';

describe('MyntWeddingEnquiriesComponent', () => {
  let component: MyntWeddingEnquiriesComponent;
  let fixture: ComponentFixture<MyntWeddingEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyntWeddingEnquiriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyntWeddingEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
