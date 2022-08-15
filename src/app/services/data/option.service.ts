import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Option } from 'src/app/models/option';
import { ApiResponse } from 'src/app/models/responses';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private static ERROR_NOT_LOADED: string = 'Options not loaded.';
  private static ERROR_NOT_FOUND: string = 'Option not found';
  private static ERROR_IS_SAVING: string = 'Options is saving';
  private static ERROR_IS_LOADING: string = 'Options is loading';
  private static ERROR_IS_LOADDED: string = 'Options is loaded';

  private _options!: Option[];  
  private _isSaving = false;
  private _isLoading = false;
  private _isLoaded = false;
  private _url = '/api/v1/options';

  get isSaving(): boolean { return this._isSaving }
  get isLoading(): boolean { return this._isLoading }
  get isLoaded(): boolean { return this._isLoaded }

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  /**
   * Get all options
   * @returns array of options
   */
  getAll(): Option[] {
    if(this._options == undefined) throw Error(OptionService.ERROR_NOT_LOADED);
    return this._options;
  }

  /**
   * Get option
   * @param id numeric id or name of option
   * @returns option or undefind if not find
   */
  get(id: number | string): Option | undefined { 
    if(this._options == undefined) throw Error(OptionService.ERROR_NOT_LOADED);

    if(typeof id == 'string') 
      return this._options.find(option => option.name == id);

    return this._options.find(option => option.id == id);
  }

  setValue(id: number | string, value: string): void { 
    let option = this.get(id);
    if(!option) throw new Error(OptionService.ERROR_NOT_FOUND);

    let indexOf = this._options.indexOf(option);
    
    this._options[indexOf].value = value;
  }

  /**
   * Save all option to database
   * TODO: When api allow save all optoion with one request rewrite this method 
   */
  saveAll(): void { 
    if(this._options == undefined) throw Error(OptionService.ERROR_NOT_LOADED);
    if(this._isSaving) throw new Error(OptionService.ERROR_IS_SAVING);

    this._isSaving = true;

    let observables: Observable<HttpEvent<ApiResponse>>[] = [];
    this._options.forEach((option: Option) => {
      observables.push(this.http.put<ApiResponse>(this._url + `/${option.id}`, { value: option.value }, { reportProgress: true, observe: "events" }));
    });

    forkJoin(observables).subscribe({
      next: (vs: any) => {
        vs.forEach((v: any) => {
          if(v.type == HttpEventType.Response) {
            this._isSaving = false;
            this.notificationService.open(v.body.message, 'success');
          }
        });
      },
      error: (e) => {
        this._isSaving = false;
        this.notificationService.open(e.error.message, 'error');
      }
    });
  }

  save(id: number | string): void {
    if(this._isSaving) throw new Error(OptionService.ERROR_IS_SAVING);

    let option = this.get(id);
    if(!option) throw new Error(OptionService.ERROR_NOT_FOUND);

    this._isSaving = true;
    this.http.put<ApiResponse>(this._url + `/${id}`, { value: option.value }, { reportProgress: true, observe: "events" }).subscribe({
      next: (v: any) => {
        if(v.type == HttpEventType.Response) {
          this._isSaving = false;
          this.notificationService.open(v.body.message, 'success');
        }
      },
      error: (e: any) => {
        this.notificationService.open(e.error.message, 'error');
      }
    });
  }

  load(): void {
    if(this.isLoading) throw new Error(OptionService.ERROR_IS_LOADING);
    if(this.isLoaded) throw new Error(OptionService.ERROR_IS_LOADDED);

    this._isLoading = true;
    let observable = this.http.get<ApiResponse>(this._url, { reportProgress: true, observe: "events" });
    observable.subscribe({
      next: (v: any) => {
        if(v.type == HttpEventType.Response) {
          this._isLoaded = true;
          this._isLoading = false;

          this._options = v.body.data;
        }
      }
    });
  }

  reload(): void {
    this._isLoading = false;
    this._isLoaded = false;
    this.load();
  }
}
