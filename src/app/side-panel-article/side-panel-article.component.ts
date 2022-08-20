import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, V } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { SidePanelService } from '../services/side-panel.service';
import { ArticleService } from '../services/data/article.service';
import { Article } from '../models/article';

@Component({
  selector: 'am-side-panel-article',
  templateUrl: './side-panel-article.component.html',
  styleUrls: ['./side-panel-article.component.scss']
})
export class SidePanelArticleComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, public articleService: ArticleService, private sidePanelService: SidePanelService, private formBuilder: FormBuilder, private noificationService: NotificationService) { }
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

    // TODO: Later seperate to other component, then this will by not load, when not needed.
    let article = this.articleService.get(this.articleId) || {} as Article; // Empty article object when article not found 
    this.articleForm = this.formBuilder.group({
      title: [article.title, Validators.required],
      thumbnail: [article.thumbnail, Validators.required],
      excerpt: [article.excerpt, Validators.required],
      categories: [article.categories, Validators.required],
      tags: [article.tags, Validators.required],
    });
  }

  changeShowDrafts(checked: boolean): void {
    this.sidePanelService.showArticleDrafts = checked;
    localStorage.setItem('showDrafts', checked ? '1' : '0');
  }

  addNewArticle(): void {
    this.articleService.addAndSave({
        title: 'Tytuł artykułu',
        thumbnail: 'ng/assets/1600x900.png',
        excerpt: 'Fragment artykułu',
        content: '{ }',
        categories: new Array<string>(),
        tags: new Array<string>(),
    } as Article).then((article) => {
        this.sidePanelService.isOpened = false; 
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['article/' + article.id])); 
    });
  }

  updateArticle(): void {
    this.articleService.set(this.articleId, {
      title: this.articleForm.get('title')?.value,
      thumbnail: this.articleForm.get('thumbnail')?.value,
      excerpt: this.articleForm.get('excerpt')?.value,
      categories: this.articleForm.get('categories')?.value,
      tags: this.articleForm.get('tags')?.value,
    } as Article);
    this.articleService.save(this.articleId);
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
