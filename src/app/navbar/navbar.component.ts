import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/data/menu.service';
import { OptionService } from '../services/data/option.service';

@Component({
  selector: 'am-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public optionService: OptionService, public menuService: MenuService) { }
}
