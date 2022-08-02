import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelOptionComponent } from './side-panel-option.component';

describe('SidePanelOptionComponent', () => {
  let component: SidePanelOptionComponent;
  let fixture: ComponentFixture<SidePanelOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePanelOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
