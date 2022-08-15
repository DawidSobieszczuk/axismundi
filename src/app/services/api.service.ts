import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'api/v1/';

  constructor(private http: HttpClient) { }

  // Menu
  getMenu(name: string): Observable<any> {
    return this.http.get(this.baseUrl + 'menus/' + name);
  }

  addMenuItem(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'menuitems', body);
  }

  setMenuItem(id: number, body: any): Observable<any> {
    return this.http.put(this.baseUrl + 'menuitems/' + id, body);
  }

  deleteMenuItem(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'menuitems/' + id);
  }

  // Articles
  getArticles(): Observable<any> {
    return this.http.get(this.baseUrl + 'articles');
  }

  getArticle(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'articles/' + id);
  }

  addArticle(body: {title: string, thumbnail: string, excerpt: string, content: string, categories: [], tags: []}) {
    return this.http.post(this.baseUrl + 'articles', body);
  }
  
  setArticle(id: number, body: {title?: string, thumbnail?: string, excerpt?: string, content?: string, categories?: [], tags?: []}) {
    return this.http.put(this.baseUrl + 'articles/' + id.toString(), body);
  }

  publishArticle(id: number): Observable<any> {
    return this.http.put(this.baseUrl + 'articles/publish/' + id.toString(), {});
  }

  unpublishArticle(id: number): Observable<any> {
    return this.http.put(this.baseUrl + 'articles/unpublish/' + id.toString(), {});
  }

  // User
  // getCurrentLoggedUser(): Observable<any> {
  //   return this.http.get(this.baseUrl + 'user');
  // }

  // setCurretLoggedUser(body: any): Observable<any> {
  //   return this.http.put(this.baseUrl + 'user', body);
  // }

  // getCurrentLoggedUserPermisions(): Observable<any> {
  //   return this.http.get(this.baseUrl + 'user/permissions');
  // }

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post(this.baseUrl + 'login', {email: email, password: password});
  // }

  // logout(): Observable<any> {
  //   return this.http.get(this.baseUrl + 'logout');
  // }

  // Options
  // setOption(id: number, value: string): Observable<any> {
  //   return this.http.put(this.baseUrl + 'options/' + id, {value: value});
  // }

  // getOptions(): Observable<any> {
  //   return this.http.get(this.baseUrl + 'options');
  // }

  // getOption(name: string): Observable<any> {
  //   return this.http.get(this.baseUrl + 'options/' + name);
  // }

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

  // Files
  uploadFile(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'files', body);
  }
}
