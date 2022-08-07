import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SidePanelService } from '../services/side-panel.service';

@Component({
  selector: 'am-side-panel-article',
  templateUrl: './side-panel-article.component.html',
  styleUrls: ['./side-panel-article.component.scss']
})
export class SidePanelArticleComponent implements OnInit {

  constructor(private router: Router, private sidePanelService: SidePanelService, private apiService: ApiService) { }

  showDrafts = false;

  ngOnInit(): void {
    if(localStorage.getItem('showDrafts') == '1') {
      this.showDrafts = true;
      this.sidePanelService.showArticleDrafts = true;
    }
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
        this.sidePanelService.isOppened = false; 
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate(['article/' + v.data.id])); 
      }
    });
  }
}
