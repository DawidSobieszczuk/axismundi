import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  image: string = 'ng/assets/hero.png'; // default

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getOption('hero-image').subscribe({
       next: (v) => this.image = v.data.value
      });
  }

}
