import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RajasthanpdetailsComponent } from './rajasthanpdetails.component';

describe('RajasthanpdetailsComponent', () => {
  let component: RajasthanpdetailsComponent;
  let fixture: ComponentFixture<RajasthanpdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RajasthanpdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RajasthanpdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
