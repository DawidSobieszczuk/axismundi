import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'am-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  get article(): any {
    let id = this.route.snapshot.params.id;
    return this.articleService.getArticle(id);
  };

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
  
  }

}
