import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../services/api.service';
import { Article } from '../models/article';
import { map, Observable } from 'rxjs';

import EditorJs from '@editorjs/editorjs';
import Marker from '@editorjs/marker';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';


@Component({
  selector: 'am-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  
  private _id!: number;

  article$!: Observable<Article>;
  editor!: any;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.article$ = this.route?.data.pipe(map((value) => value.article.data)) as Observable<Article>;

    this.article$.subscribe({
      next: (v: any) => {
        this._id = v.id;
        this.editor = new EditorJs({
        autofocus: true,
        holder: 'editor-js',
        tools: {
          marker: Marker,
          header: Header,
          image: SimpleImage,
          embed: Embed,
          quote: Quote,
          list: List,
          delimiter: Delimiter,
          table: Table
        },
        data: JSON.parse(v.content)
      });
    }
    })
  }
  
  editorSave(): void {
    this.editor.save().then(
      (output: any) => 
        this.apiService.setArticle(this._id, {content: JSON.stringify(output)}).subscribe({         
          next: (v: any) => this.successMessage = v.data.message ? v.data.message : 'Succes',
          error: (e: any) => this.errorMessage = e.error.message ? e.error.message : 'Error'
        })
    );
  }
}
