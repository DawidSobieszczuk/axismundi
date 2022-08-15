import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { ApiResponse } from '../models/responses';
import { UserPermision, User } from '../models/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url = 'api/v1/user';
  private _urlLogin = 'api/v1/login';
  private _urlLogout = 'api/v1/logout';

  subject: Subject<User | undefined> = new Subject<User | undefined>;
  isLogged: boolean = false;
  email: string | undefined;
  roles: UserPermision[] | undefined;

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  private _setUserValue(data: User): void {
    this.subject.next(data);

    this.isLogged = true;
    this.email = data.email;
    this.http.get<ApiResponse>(this._url + '/permissions').subscribe({
      next: (v) => {
        this.roles = v.data.map((e:any) => e.name);
      }
    });
  }

  checkIsUserLogged(): void {
    if(!localStorage.getItem('userToken'))
      return; 

    this.http.get<ApiResponse>(this._url).subscribe({
      next: (v) => this._setUserValue(v.data)
    });
  }

  save(email: string, password: string): void {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('password_confirmation', password);

    this.http.put<ApiResponse>(this._url, data).subscribe({
      next: (v: any) => this.notificationService.open(v.message, 'success'),
      error: (e: any) => this.notificationService.open(e.error.message, 'error'),
    });
  }

  login(email: string, password: string): void {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    this.http.post<ApiResponse>(this._urlLogin, data).subscribe({
      next: (v) => {
        this.notificationService.open(v.message, 'success');

        localStorage.setItem('userToken', v.data.token);
        this._setUserValue(v.data.user);
      },
      error: (e) => {
        this.notificationService.open(e.error.message, 'error');
      }
    });
  }

  logout(): void {
    this.http.get<ApiResponse>(this._urlLogout).subscribe({
      next: (v) => { 
        this.notificationService.open(v.message, 'success');

        localStorage.removeItem('userToken'); 
        this.isLogged = false;
        this.email = undefined;
        this.roles = undefined;

        this.subject.next(undefined);
      },
      error: (e) => {
        this.notificationService.open(e.error.message, 'error');
      }
    });
  }
}
