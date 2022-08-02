import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-side-panel-option',
  templateUrl: './side-panel-option.component.html',
  styleUrls: ['./side-panel-option.component.scss']
})
export class SidePanelOptionComponent implements OnInit {

  options!: any;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.apiService.getOptions().subscribe({
      next: (v) => this.options = v.data
    });
  }

}
