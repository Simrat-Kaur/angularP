import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoapdetailsComponent } from './goapdetails.component';

describe('GoapdetailsComponent', () => {
  let component: GoapdetailsComponent;
  let fixture: ComponentFixture<GoapdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoapdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoapdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
