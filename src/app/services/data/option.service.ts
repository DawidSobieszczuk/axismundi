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
      let option = this.get(id);
      if(!option) throw new Error(this.ERROR_NOT_FOUND);

      super.setElement(id, {
        id: id,
        name: data.name || option.name,
        value: data.value || option.value,
      } as Option);
     }

  override add(
    data: { 
      name: string,
      value: string, 
    }): void {
      super.addElement({
        id: -1,
        name: data.name || '',
        value: data.value || '',
      } as Option); 
    }
}
