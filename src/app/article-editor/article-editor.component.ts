import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import Embed from '@editorjs/embed';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import TextColor from 'editorjs-text-color-plugin';
import { NotificationService } from '../services/notification.service';
import { Article } from '../models/article';
import { ArticleService } from '../services/data/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'am-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

  private editor!: EditorJs;

  get article(): Article {
    return this.articleService.get(this.route.snapshot.params.id) || {} as Article;
  }

  constructor(public articleService: ArticleService, private route: ActivatedRoute, private router: Router) { }

  private createEditor(data: any) {
    return new EditorJs({
      autofocus: true,
      holder: 'editor-js',
      minHeight: 0,
      tools: {
        header: {
          class: Header as any,
          inlineToolbar: true,
        },
        image: SimpleImage,
        embed: {
          class: Embed,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        delimiter: Delimiter,
        table: {
          class: Table,
          inlineToolbar: true,
        },
        color: {
          class: TextColor,
          config: {
            type: 'text',
          }
        },
        marker: {
          class: TextColor,
          config: {
            type: 'marker',
            customPicker: true,
          }
        },
      },
      data: data
    });
  }

  ngOnInit(): void {
    if(Object.keys(this.article).length === 0) return;
    
    this.editor = this.createEditor(JSON.parse(this.article.content));
  }

  editorSave(): void {
    if(!this.editor) return;

    this.editor.save().then(
      (output: any) => { 
        let article = this.article;
        article.content = JSON.stringify(output);
        this.articleService.set(article.id, article);
        this.articleService.save(article.id);
      }
    );
  }

  publish(): void {
    this.articleService.publish(this.article.id);
    this.editorSave();
  }

  unpublish(): void {
    this.articleService.unpublish(this.article.id);
    this.editorSave();
  }
}
