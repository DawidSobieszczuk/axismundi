import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesResolver implements Resolve<Article[]> {
  constructor(private apiService: ApiService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[]> {
    return this.apiService.getArticles();
  }
}
