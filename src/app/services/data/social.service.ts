import { Injectable } from '@angular/core';
import { DataAbstractService } from '../abstract/data.abstract.service';
import { Social } from 'src/app/models/social';

@Injectable({
  providedIn: 'root'
})
export class SocialService extends DataAbstractService<Social> {

  protected override _url: string = '/api/v1/socials';

  override set(
    id: number,
    data: {
      name: string,
      icon: string,
      href: string,
    }): void {
      let social = this.get(id);
      if(!social) throw new Error(this.ERROR_NOT_FOUND);

      super.setElement(id, {
        id: id,
        name: data.name || social.name,
        icon: data.icon || social.icon,
        href: data.href || social.href,
      } as Social);
     }

  override add(
    data: { 
      name: string,
      icon: string,
      href: string,
    }): void {
      super.addElement({
        id: -1,
        name: data.name || '',
        icon: data.icon || '',
        href: data.href || '',
      } as Social); 
    }
}
