import { Component, OnInit, ViewChild } from '@angular/core';
import { SidePanelService } from '../services/side-panel.service';

@Component({
  selector: 'am-side-panel-article',
  templateUrl: './side-panel-article.component.html',
  styleUrls: ['./side-panel-article.component.scss']
})
export class SidePanelArticleComponent implements OnInit {

  constructor(private sidePanelService: SidePanelService) { }

  showDrafts = false;

  ngOnInit(): void {
    if(localStorage.getItem('showDrafts') == '1') {
      this.showDrafts = true;
      this.sidePanelService.showArticleDrafts = true;
    }
  }

  changeShowDrafts(checked: boolean): void {
    this.sidePanelService.showArticleDrafts = checked;
    localStorage.setItem('showDrafts', checked ? '1' : '0');
  }

  addNewArticle(): void {
    //this.articleService.addEmptyArticle(true);
  }
}
