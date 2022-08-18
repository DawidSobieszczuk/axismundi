import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OptionService } from '../services/data/option.service';
import { SocialService } from '../services/data/social.service';

@Component({
  selector: 'am-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public optionSerive: OptionService, public socialService: SocialService) { }

}
