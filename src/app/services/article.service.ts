import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: {}[] = [];
  includeDrafts = false;

  get filteredArticles() : [] {
    return this.articles.filter((article: any) => {
      return this.includeDrafts ? true : !article.is_draft;
    }) as [];
  }

  constructor(private apiService: ApiService, private router: Router) { 
    apiService.getArticles().subscribe({
      next: (v) => this.articles = v.data
    })
  }

  addEmptyArticle(redirect: boolean): void {
    this.apiService.addArticle({
      title: 'Tytuł artykułu',
      thumbnail: 'ng/assets/1600x900.png',
      excerpt: 'Fragment artykułu',
      content: 'Zawartość artykułu...',
      categories: [],
      tags: []
    }).subscribe({
      next: (v: any) => {
        this.articles.push(v.data);
        if(redirect) 
          this.router.navigate(['article/' + v.data.id]);
      }
    });
  }

  getArticle(id: any): {} | undefined {
    return this.articles.find((article: any) => { return article.id == id });
  }
}
