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
  //sidebarOpenned:boolean = false;
  get sidePanelIsOpenned(): boolean {
    return this.sidePanelService.isOppened;
  } 
  set sidePanelIsOpenned(v) {
    this.sidePanelService.isOppened = v;
  }

  isUserLogged:boolean = false;
  title = 'axismundi';

  constructor(private apiService: ApiService, private userService: UserService, private sidePanelService: SidePanelService) { }

  ngOnInit(): void {
    this.userService.isUserLogged().subscribe({
      next: (v) => { this.isUserLogged = v; this.sidePanelService.isUserLogged = v; }
    });
  }
}
