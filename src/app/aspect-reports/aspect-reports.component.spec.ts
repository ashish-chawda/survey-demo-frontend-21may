import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectReportsComponent } from './aspect-reports.component';

describe('AspectReportsComponent', () => {
  let component: AspectReportsComponent;
  let fixture: ComponentFixture<AspectReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AspectReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspectReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
