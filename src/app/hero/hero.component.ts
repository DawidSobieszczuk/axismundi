import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OptionService } from '../services/data/option.service';

@Component({
  selector: 'am-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  image: string = 'ng/assets/hero.png'; // default

  constructor(private optionService: OptionService) { }

  ngOnInit(): void {
    this.image = this.optionService.get('image')?.value || this.image;
  }

}
