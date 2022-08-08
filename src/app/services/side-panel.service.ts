import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class SidePanelService {

  isOppened: boolean = false;
  showArticleDrafts: boolean = false;

  constructor() { }
}
