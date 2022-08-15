import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OptionService } from '../services/data/option.service';

@Component({
  selector: 'am-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  socials!: [];

  constructor(private api:ApiService, public optionSerive: OptionService) { }

  ngOnInit(): void {
    this.api.getSocials().subscribe(json => this.socials = json.data);
  }

}
