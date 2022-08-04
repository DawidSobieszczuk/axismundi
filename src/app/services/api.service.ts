import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'api/v1/';

  constructor(private http: HttpClient) { }

  getMenu(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'menus/' + id);
  }

  getArticles(): Observable<any> {
    return this.http.get(this.baseUrl + 'articles');
  }

  getArticle(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'articles/' + id);
  }

  // User
  getCurrentLoggedUser(): Observable<any> {
    return this.http.get(this.baseUrl + 'user');
  }

  setCurretLoggedUser(body: any): Observable<any> {
    return this.http.put(this.baseUrl + 'user', body);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'login', {email: email, password: password});
  }

  logout(): Observable<any> {
    return this.http.get(this.baseUrl + 'logout');
  }

  // Options
  setOption(id: number, value: string): Observable<any> {
    return this.http.put(this.baseUrl + 'options/' + id, {value: value});
  }

  getOptions(): Observable<any> {
    return this.http.get(this.baseUrl + 'options');
  }

  getOption(name: string): Observable<any> {
    return this.http.get(this.baseUrl + 'options/' + name);
  }

  // Social
  getSocials(): Observable<any> {
    return this.http.get(this.baseUrl + 'socials');
  }

  getSocial(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'socials/' + id);
  }

  setSocial(id: number, body: any): Observable<any> {
    return this.http.put(this.baseUrl + 'socials/' + id, body);
  }

  addSocial(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'socials', body);
  }

  deleteSocial(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'socials/' + id);
  }
}
