import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesPanelComponent } from './cities-panel.component';

describe('CitiesPanelComponent', () => {
  let component: CitiesPanelComponent;
  let fixture: ComponentFixture<CitiesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
