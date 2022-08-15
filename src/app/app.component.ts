import { HttpEventType } from '@angular/common/http';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { OptionService } from './services/data/option.service';
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
    return this.optionService.isLoaded;
  }

  constructor(private optionService: OptionService, public userService: UserService, public sidePanelService: SidePanelService) { }

  ngOnInit(): void {
    this.optionService.load();

    this.userService.checkIsUserLogged();
  }
}