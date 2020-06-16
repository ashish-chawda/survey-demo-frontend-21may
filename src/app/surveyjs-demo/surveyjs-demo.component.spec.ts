import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyjsDemoComponent } from './surveyjs-demo.component';

describe('SurveyjsDemoComponent', () => {
  let component: SurveyjsDemoComponent;
  let fixture: ComponentFixture<SurveyjsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyjsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyjsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
