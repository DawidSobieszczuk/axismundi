import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class SidePanelService {

  isOpened: boolean = false;

  _showArticleDrafts: boolean = false;
  get showArticleDrafts(): boolean {
    return this._showArticleDrafts;
  }
  set showArticleDrafts(value: boolean) {
    this._showArticleDrafts = value;
    this.showArticleDraftsSubject.next(value);
  }

  showArticleDraftsSubject: Subject<boolean> = new Subject<boolean>;

  constructor() { }
}
