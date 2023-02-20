import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSubCategoryComponent } from './get-sub-category.component';

describe('GetSubCategoryComponent', () => {
  let component: GetSubCategoryComponent;
  let fixture: ComponentFixture<GetSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
