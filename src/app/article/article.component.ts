import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../models/article';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { ArticleService } from '../services/data/article.service';


@Component({
  selector: 'am-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {  
  html!: any;

  get article(): Article {
    return this.articleService.get(this.route.snapshot.params.id) || {} as Article;
  }

  constructor(private route: ActivatedRoute, private router: Router, private sanitaze:DomSanitizer, private formBulder: FormBuilder, private articleService: ArticleService, public userService: UserService) { }

  ngOnInit(): void {    
    if(Object.keys(this.article).length === 0) {
      this.router.navigate(['404']);
      return;
    }
    console.log('eee');

    this.html = this.convertEditorDataToHTML(this.article.content);

    this.articleService.saveSubject.subscribe({
      next: (v) => {
        if(v > 0) return;
        this.convertEditorDataToHTML(this.article.content);
      }
    });
  }

  convertEditorDataToHTML(blocksString: string) {
    let html = '';
    let blocks: [] = JSON.parse(blocksString).blocks;

    if(!blocks) return '';

    blocks.forEach((block: any) => {
      switch(block.type) {
        case 'paragraph':
          html += `<p class="ce-paragraph">${block.data.text}</p>`;
          break;
        case 'header':
          html += `<h${block.data.level} class="ce-header">${block.data.text}</h${block.data.level}>`;
          break;
        case 'embed':
          html += `<div>`
          html += `<iframe style="width:100%;" height="${block.data.height}" frameborder="0" allowfullscreen src="${block.data.embed}"></iframe>`;
          if(block.data.caption)
            html += `<div class="cdx-input caption">${block.data.caption}</div>`;
          html += `</div>`
          break;
        case 'image':
          html += `<div>`
          html += `<div class="cdx-simple-image">`
          html += `<div class="cdx-simple-image__picture`
          if(block.data.withBorder)
            html += ` cdx-simple-image__picture--with-border`
          if(block.data.withBackground)
            html += ` cdx-simple-image__picture--width-background`
          if(block.data.stretched)
            html += ` cdx-simple-image__picture--stretched`

          html += `">`
          html += `<img src="${block.data.url}">`;
          html += `</div>`
          html += `</div>`
          if(block.data.caption)
            html += `<div class="cdx-input caption">${block.data.caption}</div>`;
          html += `</div>`
          break;
        case 'list':
          if(block.data.style == 'ordered')
            html += `<ol class="cdx-list cdx-list--ordered">`;
          else
            html += `<ul class="cdx-list cdx-list--unordered">`;

          block.data.items.forEach((element: string) => {
            html += `<li class="cdx-list__item">${element}</li>`;
          });

          if(block.data.style == 'ordered')
            html += `</ol>`;
          else
            html += `</ul>`;
          break;
        case 'delimiter':
          html += `<div class="ce-delimiter"></div>`;
          break;
        case 'table':
          html += `<div>`
          html += `<div class="tc-table">`
            block.data.content.forEach((row: [], index: any) => {
              html += `<div class="tc-row">`
              row.forEach((cell: string) => {
                html += `<div class="tc-cell" ${index == 0 && block.withHeadings ? 'heading="Heading"' : ''}>${cell}</div>`
              });
              html += `</div>`
            });
          html += `</div>`
          html += `</div>`
          break;
          case 'quote':
            html += `<div class="cdx-quote">`;
            html += `<div class="cdx-quote__text">${block.data.text}</div>`;
            if(block.data.caption)
              html += `<div class="cdx-quote__caption">${block.caption}</div>`;
            html += `</div>`;
            break;
      }
    });

    return this.sanitaze.bypassSecurityTrustHtml(html);
  }
}
