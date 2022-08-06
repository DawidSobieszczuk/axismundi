import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidePanelService {

  isUserLogged: boolean = false;
  userRoles: string[] = [];

  showArticleDrafts: boolean = false;

  constructor() { }
}
