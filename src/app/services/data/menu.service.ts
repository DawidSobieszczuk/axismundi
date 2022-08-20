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
      let menuitem = this.get(id);
      if(!menuitem) throw new Error(this.ERROR_NOT_FOUND);

      super.setElement(id, {
        id: id,
        menu_id: data.menu_id || menuitem.menu_id,
        name: data.name || menuitem.name,
        href: data.href || menuitem.href,
      } as MenuItem); 
    }

  override add(
    data: { 
      menu_id: number,
      name: string,
      href: string, 
    }): void { 
      super.addElement({
        id: -1,
        menu_id: data.menu_id || -1,
        name: data.name || '',
        href: data.href || '',
      } as MenuItem); 
    }
}
