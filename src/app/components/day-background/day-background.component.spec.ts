import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBackgroundComponent } from './day-background.component';

describe('DayBackgroundComponent', () => {
  let component: DayBackgroundComponent;
  let fixture: ComponentFixture<DayBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
