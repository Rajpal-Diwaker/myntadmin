import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyntFaqComponent } from './mynt-faq.component';

describe('MyntFaqComponent', () => {
  let component: MyntFaqComponent;
  let fixture: ComponentFixture<MyntFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyntFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyntFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
