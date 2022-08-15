import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OptionService } from '../services/data/option.service';

@Component({
  selector: 'am-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems!: any[];

  constructor(private apiService: ApiService, public optionService: OptionService) { }

  ngOnInit(): void {
    this.apiService.getMenu('nav').subscribe({
      next: (v) => this.menuItems = v.data.items
    });
  }

}
