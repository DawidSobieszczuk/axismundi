import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { SidePanelService } from './services/side-panel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarOpenned:boolean = false;
  isUserLogged:boolean = false;
  title = 'axismundi';

  constructor(private apiService: ApiService, private sidePanelService: SidePanelService) { }

  ngOnInit(): void {
    this.apiService.getCurrentLoggedUser().subscribe({
      next: (v) => { this.isUserLogged = true; this.sidePanelService.isUserLogged = true },
      error: () => {}
    });
  }
}
