import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer, Subject } from 'rxjs';
import { ApiResponse } from 'src/app/models/responses';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataAbstractService<T> {

  private saveObserver: Partial<Observer<ApiResponse>> = {
    next: (v) => {
      this._savingCount--;
      this.notificationService.open(v.message, 'success');
      this.saveSubject.next(this._savingCount);
    },
    error: (e) => {
      this._savingCount--;
      this.notificationService.open(e.error.message, 'error');
      this.saveSubject.next(this._savingCount);
    }
  }

  protected ERROR_NOT_LOADED: string = `${this.constructor.name}: elements not loaded.`;
  protected ERROR_NOT_FOUND: string = `${this.constructor.name}: elements not found.`;
  protected ERROR_IS_SAVING: string = `${this.constructor.name}: saving`;
  protected ERROR_IS_LOADING: string = `${this.constructor.name}: loading`;
  protected ERROR_IS_LOADDED: string = `${this.constructor.name}: loaded`;

  protected _elements!: Array<T>;
  protected _idsToDelete: Array<number> = [];

  protected _savingCount = 0;
  protected _isLoading: boolean = false;
  protected _isLoaded: boolean = false;
  protected _url!: string;

  get isSaving(): boolean { return this._savingCount > 0 }
  get isLoading(): boolean { return this._isLoading }
  get isLoaded(): boolean { return this._isLoaded }  

  /**
   * Value represente saving count whene 0 everything is saved
   */
  saveSubject: Subject<number> = new Subject<number>();
  
  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getAll(): T[] {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    return this._elements;
  }
  get(id: number): T | undefined {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    return this._elements.find((element: any) => element.id == id);
  }

  set(id: number, data: T): void {
    let element = this.get(id);
    if(!element) throw new Error(this.ERROR_NOT_FOUND);

    let index = this._elements.indexOf(element);
    this._elements[index] = data;
  }
  add(data: T): void {
    this._elements.push(data);
  }
  addAndSave(data: T): void {
    if(this.isSaving) throw new Error(this.ERROR_IS_SAVING);

    this.add(data);
    this.saveAdd(this._elements[this._elements.length-1]);
  }
  delete(id: number): void {
    let element = this.get(id);
    if(!element) throw new Error(this.ERROR_NOT_FOUND);

    this._idsToDelete.push(id);
    let index = this._elements.indexOf(element);
    this._elements.splice(index, 1);
  }

  saveAll(): void {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    if(this.isSaving) throw new Error(this.ERROR_IS_SAVING);

    this._elements.forEach((element: any) => {
      if(element.id < 0) {
        this.saveAdd(element);
      } else {
        this.saveUpdate(element);
      }
    });

    this._idsToDelete.forEach(element => {
      this.saveDelete(element);
    })
    this._idsToDelete = [];
  }
  save(id: number) {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    if(this.isSaving) throw new Error(this.ERROR_IS_SAVING);

    let element = this.get(id);
    if(!element) throw new Error(this.ERROR_NOT_FOUND);

    this.saveUpdate(element);
  }
  private saveUpdate(element: any): void {
    this._savingCount++;
    this.http.put<ApiResponse>(this._url + `/${element.id}`, element).subscribe(this.saveObserver);
  }
  private saveAdd(element: any): void {
    this._savingCount++;
    this.http.post<ApiResponse>(this._url, element).subscribe({
      next: (v: any) => {
        let index = this._elements.indexOf(element);
        (this._elements[index] as any).id = v.data.id;

        this._savingCount--;
        this.notificationService.open(v.message, 'success');
        this.saveSubject.next(this._savingCount);
      },
      error: (e) => {
        this._savingCount--;
        this.notificationService.open(e.error.message, 'error');
        this.saveSubject.next(this._savingCount);
      }
    });
  }
  private saveDelete(id: number): void {
    this._savingCount++;
    this.http.delete<ApiResponse>(this._url + `/${id}`).subscribe(this.saveObserver);
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
