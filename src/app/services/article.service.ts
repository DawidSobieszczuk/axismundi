import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: [] = [];
  includeDrafts = false;

  get filteredArticles() : [] {
    return this.articles.filter((article: any) => {
      return this.includeDrafts ? true : !article.is_draft;
    }) as [];
  }

  constructor(private apiService: ApiService) { 
    apiService.getArticles().subscribe({
      next: (v) => this.articles = v.data
    })
  }
}
