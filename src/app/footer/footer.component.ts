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
  copyright: string = '© 2022 AxisMundi';

  constructor(private api:ApiService, private optionSerive: OptionService) { }

  ngOnInit(): void {
    this.api.getSocials().subscribe(json => this.socials = json.data);
    this.copyright = this.optionSerive.get('copyright')?.value || this.copyright;
  }

}
