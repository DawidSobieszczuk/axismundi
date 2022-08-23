import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observer, Subject } from 'rxjs';
import { ApiResponse } from 'src/app/models/responses';
import { NotificationService } from '../notification.service';
import { LoadDataAbstractService } from './load-data.abstract.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataAbstractService<T> extends LoadDataAbstractService<T> {
  protected ERROR_NOT_FOUND: string = `${this.constructor.name}: element not found.`;

  protected _idsToDelete: Array<number> = [];
  protected _savingCount = 0;

  get isSaving(): boolean { return this._savingCount > 0 }

  /**
   * Value represente saving count whene 0 everything is saved
   */
  saveSubject: Subject<number> = new Subject<number>();

  abstract set(id: number, data: {}): void;
  protected setElement(id: number, newElement: T) {
    let element = this.get(id);
    if(!element) throw new Error(this.ERROR_NOT_FOUND);

    let index = this._elements.indexOf(element);
    this._elements[index] = newElement;
  }
  abstract add(data: {}): void;
  protected addElement(element: T) {
      this._elements.push(element);
  }

  addAndSave(data: T): Promise<T> {
    if(this.isSaving) throw new Error(this.ERROR_IS_SAVING);

    this.add(data);
    return this.saveAdd(this._elements[this._elements.length-1]);
  }
  delete(id: number): void {
    let element = this.get(id);
    if(!element) throw new Error(this.ERROR_NOT_FOUND);

    this._idsToDelete.push(id);
    let index = this._elements.indexOf(element);
    this._elements.splice(index, 1);
  }

  saveAll(): Promise<any> {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    if(this.isSaving) throw new Error(this.ERROR_IS_SAVING);

    let promises: Promise<any>[] = [];

    this._elements.forEach((element: any) => {
      if(element.id < 0) {
        promises.push(this.saveAdd(element));
      } else {
        promises.push(this.saveUpdate(element));
      }
    });

    this._idsToDelete.forEach(element => {
      promises.push(this.saveDelete(element));
    })
    this._idsToDelete = [];

    return Promise.all(promises);
  }
  save(id: number): Promise<T> {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    if(this.isSaving) throw new Error(this.ERROR_IS_SAVING);

    let element = this.get(id);
    if(!element) throw new Error(this.ERROR_NOT_FOUND);

    return this.saveUpdate(element);
  }
  private saveUpdate(element: any): Promise<T> {
    this._savingCount++;
    return new Promise<T>((resolve, reject) => {
      this.http.put<ApiResponse>(this._url + `/${element.id}`, element).subscribe({
        next: (v) => {
          this._savingCount--;
          this.notificationService.open(v.message, 'success');
          this.saveSubject.next(this._savingCount);
          resolve(element);
        },
        error: (e) => {
          this._savingCount--;
          this.notificationService.open(e.error.message, 'error');
          this.saveSubject.next(this._savingCount);
          reject(e);
        }
      });
    });
  }
  private saveAdd(element: any): Promise<T> {
    this._savingCount++;

    return new Promise<T>((resolve, reject) => {
      this.http.post<ApiResponse>(this._url, element).subscribe({
        next: (v: any) => {
          let index = this._elements.indexOf(element);
          (this._elements[index] as any).id = v.data.id;
  
          this._savingCount--;
          this.notificationService.open(v.message, 'success');
          this.saveSubject.next(this._savingCount);
          resolve(element);
        },
        error: (e) => {
          this._savingCount--;
          this.notificationService.open(e.error.message, 'error');
          this.saveSubject.next(this._savingCount);
          reject(e);
        }
      })
    });
  }
  private saveDelete(id: number): Promise<void> {
    this._savingCount++;
    ;
    return new Promise<void>((resolve, reject) => {
      this.http.delete<ApiResponse>(this._url + `/${id}`).subscribe({
        next: (v) => {
          this._savingCount--;
          this.notificationService.open(v.message, 'success');
          this.saveSubject.next(this._savingCount);
          resolve();
        },
        error: (e) => {
          this._savingCount--;
          this.notificationService.open(e.error.message, 'error');
          this.saveSubject.next(this._savingCount);
          reject(e);
        }
      });
    });
  }
}
