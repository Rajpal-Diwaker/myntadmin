import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyntMasterComponent } from './mynt-master.component';

describe('MyntMasterComponent', () => {
  let component: MyntMasterComponent;
  let fixture: ComponentFixture<MyntMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyntMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyntMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
