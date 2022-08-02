import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-side-panel-social',
  templateUrl: './side-panel-social.component.html',
  styleUrls: ['./side-panel-social.component.scss']
})
export class SidePanelSocialComponent implements OnInit {

  socials!: any;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.apiService.getSocials().subscribe({
      next: (v) => this.socials = v.data
    });
  }

}
