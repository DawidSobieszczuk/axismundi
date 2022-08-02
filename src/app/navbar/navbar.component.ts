import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logoSrc = 'storage/logo.png';
  menuItems!:[];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }

}
