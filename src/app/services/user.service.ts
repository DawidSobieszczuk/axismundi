import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, of, Subject} from 'rxjs';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedSubject: Subject<boolean> = new Subject<boolean>;
  isLogged: boolean = false;
  email: string | undefined;
  roles: string[] | undefined;

  constructor(private apiService: ApiService, private notificationService: NotificationService) { }

  checkIsUserLogged(): void {
    if(!localStorage.getItem('userToken'))
      return; 

    this.apiService.getCurrentLoggedUser().subscribe({
      next: (v) => {
        this._setUserValue(v.data);
      }
    })
  }

  private _setUserValue(data: any): void {
    this.isLoggedSubject.next(true);
    this.isLogged = true;
    this.email = data.email;
    this.apiService.getCurrentLoggedUserPermisions().subscribe({
      next: (v) => {
        this.roles = v.data.map((e:any) => e.name);
      }
    });
  }

  login(email: string, password: string): void {
    this.apiService.login(email, password).subscribe({
      next: (v) => {
        localStorage.setItem('userToken', v.data.token);
        this.notificationService.open(v.message || 'User logged in', 'success');

        this._setUserValue(v.data.user);
      }
    });
  }

  logout(): void {
    this.apiService.logout().subscribe({
      next: (v) => { 
        localStorage.removeItem('userToken'); 
        this.notificationService.open(v.message || 'User logged out', 'success');
        this.isLogged = false;
        this.isLoggedSubject.next(false);
        this.email = undefined;
        this.roles = undefined;
      }
    });
  }
}
