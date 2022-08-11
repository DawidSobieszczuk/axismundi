import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header';
import SimpleImage from '@editorjs/simple-image';
import Embed from '@editorjs/embed';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import TextColor from 'editorjs-text-color-plugin';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { Article } from '../models/article';

@Component({
  selector: 'am-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

  @Input() article!: Article;
  @Output() save = new EventEmitter<Article>;
  published!: boolean;

  private editor!: EditorJs;

  constructor(private apiService: ApiService, private notificationService: NotificationService) { }

  private _createEditor(data: any) {
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
    this.editor = this._createEditor(JSON.parse(this.article.content));
    this.published = !this.article.is_draft;
  }

  editorSave(): void {
    if(!this.editor) return;

    this.editor.save().then(
      (output: any) => 
        this.apiService.setArticle(parseInt(this.article.id), {content: JSON.stringify(output)}).subscribe({         
          next: (v: any) => {
            this.article = v.data;
            this.save.emit(v.data);
            this.notificationService.open(v.message ? v.message : 'Article saved', 'success');
          },
          error: (e: any) => {
            this.notificationService.open(e.error.message ? e.error.message : 'Cannot save article', 'error');
          }
        })
    );
  }

  publish(): void {
    this.editorSave();

    let req = this.apiService.publishArticle(parseInt(this.article.id)).subscribe({
      next: (v) => {
        this.article = v.data;
        this.published = true;
        this.notificationService.open(v.message || 'Article published', 'success');
      },
      error: (e) => {
        this.notificationService.open(e.error.message || 'Cannot publish article', 'error');
      }
    })
  }

  unpublish(): void {
    let req = this.apiService.unpublishArticle(parseInt(this.article.id)).subscribe({
      next: (v) => {
        this.article = v.data;
        this.published = false;
        this.notificationService.open(v.message || 'Article unpublished', 'success');
      },
      error: (e) => {
        this.notificationService.open(e.error.message || 'Cannot unpublish article', 'error');
      }
    })
  }
}
