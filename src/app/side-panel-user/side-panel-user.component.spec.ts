import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelUserComponent } from './side-panel-user.component';

describe('SidePanelUserComponent', () => {
  let component: SidePanelUserComponent;
  let fixture: ComponentFixture<SidePanelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePanelUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
