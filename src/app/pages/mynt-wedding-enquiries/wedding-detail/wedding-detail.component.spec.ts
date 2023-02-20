import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingDetailComponent } from './wedding-detail.component';

describe('WeddingDetailComponent', () => {
  let component: WeddingDetailComponent;
  let fixture: ComponentFixture<WeddingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeddingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
