import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HimachaldestdetailsComponent } from './himachaldestdetails.component';

describe('HimachaldestdetailsComponent', () => {
  let component: HimachaldestdetailsComponent;
  let fixture: ComponentFixture<HimachaldestdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HimachaldestdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HimachaldestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
