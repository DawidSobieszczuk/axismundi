import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/responses';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoadDataAbstractService<T> {
  
  protected ERROR_NOT_LOADED: string = `${this.constructor.name}: elements not loaded.`;
  protected ERROR_IS_LOADING: string = `${this.constructor.name}: loading`;
  protected ERROR_IS_LOADDED: string = `${this.constructor.name}: loaded`;
  protected ERROR_IS_SAVING: string = `${this.constructor.name}: saving`;

  protected _elements!: Array<T>;
  protected _isLoading: boolean = false;
  protected _isLoaded: boolean = false;
  protected _url!: string;

  get isLoading(): boolean { return this._isLoading }
  get isLoaded(): boolean { return this._isLoaded }  

  constructor(protected http: HttpClient, protected notificationService: NotificationService) { }

  getAll(): T[] {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    return this._elements;
  }
  get(id: number): T | undefined {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    return this._elements.find((element: any) => element.id == id);
  }

  load(): void { 
    if(this.isLoading) throw new Error(this.ERROR_IS_LOADING);
    if(this.isLoaded) throw new Error(this.ERROR_IS_LOADDED);

    this._isLoading = true;
    this.http.get<ApiResponse>(this._url).subscribe({
      next: (v) => {
        this._isLoaded = true;
        this._isLoading = false;

        this._elements = v.data;
      }
    });
  }
  reload(): void { 
    this._isLoading = false;
    this._isLoaded = false;
    this.load();
  }
}
