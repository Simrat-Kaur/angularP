import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RajasthandestdetailsComponent } from './rajasthandestdetails.component';

describe('RajasthandestdetailsComponent', () => {
  let component: RajasthandestdetailsComponent;
  let fixture: ComponentFixture<RajasthandestdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RajasthandestdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RajasthandestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
