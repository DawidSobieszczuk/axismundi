import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'am-side-panel-article',
  templateUrl: './side-panel-article.component.html',
  styleUrls: ['./side-panel-article.component.scss']
})
export class SidePanelArticleComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  showDrafts = false;

  ngOnInit(): void {
    if(localStorage.getItem('showDrafts') == '1') {
      this.showDrafts = true;
      this.articleService.includeDrafts = true;
    }
  }

  changeShowDrafts(checked: boolean): void {
    this.articleService.includeDrafts = checked;
    localStorage.setItem('showDrafts', checked ? '1' : '0');
  }

  createNewArticle(): void {

  }
}
