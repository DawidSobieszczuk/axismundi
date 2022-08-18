import { Injectable } from '@angular/core';
import { MenuItem } from 'src/app/models/menu';
import { DataAbstractService } from './data.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends DataAbstractService<MenuItem> {

  protected override _url: string = '/api/v1/menuitems';

  override set(
    id: number,
    data: { 
      menu_id: number,
      name: string, 
      href: string,
    }): void { 
      super.set(id, {
        id: id,
        menu_id: data.menu_id,
        name: data.name,
        href: data.href,
      } as MenuItem); 
    }

  override add(
    data: { 
      menu_id: number,
      name: string,
      href: string, 
    }): void { 
      super.add({
        id: -1,
        menu_id: data.menu_id,
        name: data.name,
        href: data.href,
      } as MenuItem); 
    }
}
