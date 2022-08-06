import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';

import EditorJs from '@editorjs/editorjs';
import { Article } from '../models/article';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'am-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  
  article$!: Observable<Article>;
  editor!: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.article$ = this.route?.data.pipe(map((value) => value.article.data)) as Observable<Article>;

    this.editor = new EditorJs({
      holder: 'editor-js',
    }); 
  }

}
