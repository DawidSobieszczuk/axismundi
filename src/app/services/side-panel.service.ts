import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidePanelService {

  isUserLogged: boolean = false;
  userRoles: string[] = [];

  isOppened: boolean = false;

  showArticleDrafts: boolean = false;

  constructor() { }
}
