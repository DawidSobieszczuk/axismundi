import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ArticleService } from '../services/article.service';

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

  get pageSlice() : any {
    return this.articles.slice(this.startIndex, this.endIndex);
  }
  
  get articles() : [] {
    return this.articleServce.filteredArticles.reverse() as [];
  }

  constructor(private articleServce: ArticleService) { }

  ngOnInit(): void {}

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.startIndex = event.pageIndex * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }
}
