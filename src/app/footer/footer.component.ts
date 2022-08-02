import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  socials!: [];
  email: string = 'dawidsobieszczuk@gmail.com';
  copyright: string = '© 2022 AxisMundi';

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getSocials().subscribe(json => this.socials = json.data);
    this.api.getOption('copyright').subscribe(json => this.copyright = json.data.value);
  }

}
