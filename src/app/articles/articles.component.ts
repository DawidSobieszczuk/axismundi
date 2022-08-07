import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, skip, take } from 'rxjs';
import { Article } from '../models/article';
import { SidePanelService } from '../services/side-panel.service';

@Component({
  selector: 'am-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  pageSize = 20;
  pageSizeOptions = [20, 32, 44];
  startIndex = 0;
  endIndex = 20;

  get pageSlice$() : Observable<Article[]> {
    return this.articles$.pipe(map((value) => value.slice(this.startIndex, this.endIndex)))
  }

  _articles$!: Observable<Article[]>;  
  get articles$(): Observable<Article[]> {
    return this._articles$.pipe(map((value) => value.filter((article: Article) => this.sidePanelService.showArticleDrafts ? true : !article.is_draft)));
  }; 

  constructor(private route: ActivatedRoute, private sidePanelService : SidePanelService) { }

  ngOnInit(): void {
    this._articles$ = this.route?.data.pipe(map((value) => value.articles.data.reverse())) as Observable<Article[]>;
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.startIndex = event.pageIndex * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }
}
