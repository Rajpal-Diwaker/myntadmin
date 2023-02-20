import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyntProfessionalComponent } from './mynt-professional.component';

describe('MyntProfessionalComponent', () => {
  let component: MyntProfessionalComponent;
  let fixture: ComponentFixture<MyntProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyntProfessionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyntProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
