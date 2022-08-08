import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { NotificationService } from '../services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { E } from '@angular/cdk/keycodes';
import { SidePanelService } from '../services/side-panel.service';


@Component({
  selector: 'am-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  
  private _id!: number;

  article$!: Observable<Article>;
  
  editor!: any;

  constructor(private cdr:ChangeDetectorRef, private route: ActivatedRoute, private apiService: ApiService, private formBulder: FormBuilder, private sidePanelService: SidePanelService, private notificationService: NotificationService) { }
  
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
          next: (v: any) => {
            this.notificationService.open(v.message ? v.message : 'Saved', 'success');
          },
          error: (e: any) => {
            this.notificationService.open(e.error.message ? e.error.message : 'Cannot save article', 'error');
          }
        })
    );
  }

  publish(): void {
    this.editorSave();

    let req = this.apiService.publishArticle(this._id);
    this.article$ = req.pipe(map((value) => value.data));
    req.subscribe({
      next: (v) => {
        this.notificationService.open(v.message || 'Article published', 'success');
      },
      error: (e) => {
        this.notificationService.open(e.error.message || 'Cannot publish article', 'error');
      }
    })
  }

  unpublish(): void {
    let req = this.apiService.unpublishArticle(this._id);
    this.article$ = req.pipe(map((value) => value.data));
    req.subscribe({
      next: (v) => {
        this.notificationService.open(v.message || 'Article unpublished', 'success');
      },
      error: (e) => {
        this.notificationService.open(e.error.message || 'Cannot unpublish article', 'error');
      }
    })
  }
}
