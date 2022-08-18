import { Injectable } from '@angular/core';
import { DataAbstractService } from './data.abstract.service';
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
      super.set(id, {
        id: id,
        name: data.name,
        icon: data.icon,
        href: data.href,
      } as Social);
     }

  override add(
    data: { 
      name: string,
      icon: string,
      href: string,
    }): void {
      super.add({
        id: -1,
        name: data.name,
        icon: data.icon,
        href: data.href,
      } as Social); 
    }
}
