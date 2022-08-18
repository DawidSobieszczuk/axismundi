import { O } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { Option } from 'src/app/models/option';
import { DataAbstractService } from './data.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class OptionService extends DataAbstractService<Option> {
  protected override _url: string = '/api/v1/options';

  getByName(name: string) {
    if(this._elements == undefined) throw new Error(this.ERROR_NOT_LOADED);
    return this._elements.find(element => element.name == name);
  }

  override set(
    id: number,
    data: {
      name: string
      value: string 
    }): void {
      super.set(id, {
        id: id,
        name: data.name,
        value: data.value,
      } as Option);
     }

  override add(
    data: { 
      name: string,
      value: string, 
    }): void {
      super.add({
        id: -1,
        name: data.name,
        value: data.value,
      } as Option); 
    }
}
