import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  length = 0;
  pageSize = 20;
  pageSizeOptions = [20, 32, 44];


  articles!: [];
  pageSlice: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getArticles().subscribe({
      next: (v) => {
        this.length = v.data.length;

        this.articles = v.data;
        this.pageSlice = this.articles.slice(0, this.pageSize);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    let start = event.pageIndex * this.pageSize;
    let end = start + this.pageSize;
    this.pageSlice = this.articles.slice(start, end);
  }
}
