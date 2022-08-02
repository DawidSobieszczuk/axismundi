import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelSocialComponent } from './side-panel-social.component';

describe('SidePanelSocialComponent', () => {
  let component: SidePanelSocialComponent;
  let fixture: ComponentFixture<SidePanelSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePanelSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
