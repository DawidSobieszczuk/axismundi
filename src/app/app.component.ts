import { HttpEventType } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuService } from './services/data/menu.service';
import { OptionService } from './services/data/option.service';
import { SocialService } from './services/data/social.service';
import { SidePanelService } from './services/side-panel.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'axismundi';
  get isLoaded(): boolean {
    return this.optionService.isLoaded 
        && this.menuService.isLoaded
        && this.socialService.isLoaded;
  }

  constructor(
    private socialService: SocialService, 
    private optionService: OptionService, 
    private menuService: MenuService, 
    public userService: UserService,
    public sidePanelService: SidePanelService
  ) { }

  ngOnInit(): void {
    this.optionService.load();
    this.menuService.load();
    this.socialService.load();

    this.userService.checkIsUserLogged();
  }
}