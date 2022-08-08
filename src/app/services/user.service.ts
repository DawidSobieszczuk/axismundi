import { Injectable } from '@angular/core';
import { Observable, map, catchError, of} from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  isUserLogged(): Observable<boolean> {
    let userToken = localStorage.getItem('userToken');
    if(!userToken) return new Observable<boolean>((observer) => {observer.next(false)});
    return this.apiService.getCurrentLoggedUser().pipe(map((value:any) => value.data), catchError((err: any) => of(false)));
  }
}
