import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from '../models/article';
import { ArticleService } from '../services/data/article.service';
import { SidePanelService } from '../services/side-panel.service';

@Component({
  selector: 'am-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  private _startIndex = 0;
  private _endIndex = 20;
  private _subscripton!: Subscription;

  pageSize = 20;
  pageSizeOptions = [20, 32, 44];

  pageSlice!: Article[];

  constructor(private route: ActivatedRoute, public articleService: ArticleService, private sidePanelService: SidePanelService) { }

  ngOnInit(): void {
    this.pageSlice = this.pageSlice = this.getArticles().slice(this._startIndex, this._endIndex)
    this._subscripton = this.sidePanelService.showArticleDraftsSubject.subscribe({
      next: () => this.pageSlice = this.getArticles().slice(this._startIndex, this._endIndex)
    });
  }

  ngOnDestroy(): void {
    this._subscripton.unsubscribe();
  }

  getArticles(): Article[] {
    return this.articleService.getAll().filter((article: Article) => {
      let draft = this.sidePanelService.showArticleDrafts ? true : !article.is_draft;

      let category = true;
      let categoryName = this.route.snapshot.params.category;
      if(categoryName) {
        category = article.categories.includes(categoryName);
      }

      let tag = true;
      let tagName = this.route.snapshot.params.tag;
      if(tagName) {
        tag = article.tags.includes(tagName);
      }

      return draft && category && tag;
    });
  }

  onPageChange(event: PageEvent) {
    this._startIndex = event.pageIndex * event.pageSize;
    this._endIndex = this._startIndex + event.pageSize;

    this.pageSlice = this.getArticles().slice(this._startIndex, this._endIndex);
  }
}
