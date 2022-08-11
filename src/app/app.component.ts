import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { SidePanelService } from './services/side-panel.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'axismundi';

  constructor(public userService: UserService, public sidePanelService: SidePanelService) { }

  ngOnInit(): void {
    this.userService.checkIsUserLogged();
  }
}

export function Required(target: object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get() {
      throw new Error(`Attribute ${propertyKey} is required`);
    },
    set(value) {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true,
  }); 
}