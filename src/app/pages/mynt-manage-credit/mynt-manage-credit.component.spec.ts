import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyntManageCreditComponent } from './mynt-manage-credit.component';

describe('MyntManageCreditComponent', () => {
  let component: MyntManageCreditComponent;
  let fixture: ComponentFixture<MyntManageCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyntManageCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyntManageCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
