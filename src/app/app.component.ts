import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarOpenned:boolean = false;
  isUserLogged:boolean = false;
  title = 'public14';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCurrentLoggedUser().subscribe({
      next: (v) => { this.isUserLogged = true; },
      error: () => {}
    });
  }
}
