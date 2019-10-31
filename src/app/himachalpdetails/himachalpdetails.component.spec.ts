import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HimachalpdetailsComponent } from './himachalpdetails.component';

describe('HimachalpdetailsComponent', () => {
  let component: HimachalpdetailsComponent;
  let fixture: ComponentFixture<HimachalpdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HimachalpdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HimachalpdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
