import { Injectable } from '@angular/core';
import { File } from '../models/file';
import { LoadDataAbstractService } from './abstract/load-data.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class FileService extends LoadDataAbstractService<File> {
  protected override _url: string = '/api/v1/files';
}
