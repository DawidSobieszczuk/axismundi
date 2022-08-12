import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logoSrc = 'ng/assets/logo.png'; // default
  menuItems!: any[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getOption('logo').subscribe({
      next: (v) => this.logoSrc = v.data.value
    });
    this.apiService.getMenu('nav').subscribe({
      next: (v) => this.menuItems = v.data.items
    });
  }

}
