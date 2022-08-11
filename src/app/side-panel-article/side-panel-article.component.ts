import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, V } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { SidePanelService } from '../services/side-panel.service';

@Component({
  selector: 'am-side-panel-article',
  templateUrl: './side-panel-article.component.html',
  styleUrls: ['./side-panel-article.component.scss']
})
export class SidePanelArticleComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private sidePanelService: SidePanelService, private apiService: ApiService, private formBuilder: FormBuilder, private noificationService: NotificationService) { }
  showDrafts = false;

  articleForm!: FormGroup;
  categories: string[] = [];
  tags: string[] = [];
  separatorKeysCodes = [ENTER, COMMA];

  get articleId() {
    return this.route.snapshot.firstChild?.params.id;
  }

  get formCategories() {
    return this.articleForm.get('categories');
  }

  get formTags() {
    return this.articleForm.get('tags');
  }

  ngOnInit(): void {
    if(localStorage.getItem('showDrafts') == '1') {
      this.showDrafts = true;
      this.sidePanelService.showArticleDrafts = true;
    }

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      thumbnail: ['', Validators.required],
      excerpt: ['', Validators.required],
      categories: [[], Validators.required],
      tags: [[], Validators.required],
    })

    setTimeout(() => {
      // wait a tick, then articleId will have value
      // TODO: Sometimes dont show values in form
      if(!this.articleId) return;

      this.apiService.getArticle(this.articleId).subscribe({
        next: (v) => {
            this.articleForm = this.formBuilder.group({
            title: [v.data.title, Validators.required],
            thumbnail: [v.data.thumbnail, Validators.required],
            excerpt: [v.data.excerpt, Validators.required],
            categories: [v.data.categories, Validators.required],
            tags: [v.data.tags, Validators.required],
          });
        }
      });
    });
  }

  changeShowDrafts(checked: boolean): void {
    this.sidePanelService.showArticleDrafts = checked;
    localStorage.setItem('showDrafts', checked ? '1' : '0');
  }

  addNewArticle(): void {
    this.apiService.addArticle({
      title: 'Tytuł artykułu',
      thumbnail: 'ng/assets/1600x900.png',
      excerpt: 'Fragment artykułu',
      content: '{ }',
      categories: [],
      tags: []
    }).subscribe({
      next: (v: any) =>  { 
        this.noificationService.open(v.message ? v.message : "Create new article", 'success');
        this.sidePanelService.isOpened = false; 
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['article/' + v.data.id])); 
      }
    });
  }

  updateArticle(): void {
    this.apiService.setArticle(this.articleId, {
      title: this.articleForm.get('title')?.value,
      thumbnail: this.articleForm.get('thumbnail')?.value,
      excerpt: this.articleForm.get('excerpt')?.value,
      categories: this.articleForm.get('categories')?.value,
      tags: this.articleForm.get('tags')?.value,
    }).subscribe({
      next: (v: any) => this.noificationService.open(v.message || 'Update article', 'success'),
      error: (e: any) => this.noificationService.open(e.error.message || 'Cannot update article', 'error')
    });
  }

  addCategory(event: any): void {
    let value = (event.value || '').trim();

    if(value)
      this.formCategories?.value.push(value)
    this.formCategories?.updateValueAndValidity();

    event.chipInput.clear();
  }

  addTag(event: any): void {
    let value = (event.value || '').trim();

    if(value)
      this.formTags?.value.push(value);
    this.formTags?.updateValueAndValidity();

    event.chipInput.clear();
  }

  removeCategory(category: string): void {
    this.formCategories?.value.forEach((item: any, index: any) => {
      if(item == category) this.formCategories?.value.splice(index, 1);
    });

    this.formCategories?.updateValueAndValidity();
  }

  removeTag(tag: string):void {
    this.formTags?.value.forEach((item: any, index: any) => {
      if(item == tag) this.formTags?.value.splice(index, 1);
    });

    this.formTags?.updateValueAndValidity();
  }
}
