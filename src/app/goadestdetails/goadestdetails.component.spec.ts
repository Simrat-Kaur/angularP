import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoadestdetailsComponent } from './goadestdetails.component';

describe('GoadestdetailsComponent', () => {
  let component: GoadestdetailsComponent;
  let fixture: ComponentFixture<GoadestdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoadestdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoadestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
