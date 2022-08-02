import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelArticleComponent } from './side-panel-article.component';

describe('SidePanelArticleComponent', () => {
  let component: SidePanelArticleComponent;
  let fixture: ComponentFixture<SidePanelArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidePanelArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
