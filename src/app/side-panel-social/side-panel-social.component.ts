import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Social } from '../models/social';
import { SocialService } from '../services/data/social.service';

@Component({
  selector: 'am-side-panel-social',
  templateUrl: './side-panel-social.component.html',
  styleUrls: ['./side-panel-social.component.scss']
})
export class SidePanelSocialComponent implements OnInit {

  private _subscription!: Subscription;

  form!: FormGroup;
  idsToDeleteList: number[] = [];
  
  get socialsFormArray() {
    return this.form.get('socials') as FormArray;
  }
  
  constructor(private socialService: SocialService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'socials': this.formBuilder.array([])
    });

    this.refreshFromArray();

    this._subscription = this.socialService.saveSubject.subscribe({
      next: (v) => {
        if(v > 0) return;
        this.refreshFromArray();
      }
    });
  }

  private refreshFromArray() {
    this.socialsFormArray.clear();
    this.socialService.getAll().forEach((element: Social) => {
      this.socialsFormArray.push(this.formBuilder.group({
        'id': [element.id],
        'name': [element.name, Validators.required],
        'icon': [element.icon, Validators.required],
        'href': [element.href, Validators.required]
      }))
    });
  }

  addSocial(): void {
    this.socialsFormArray.push(this.formBuilder.group({
      'id': [-1],
      'name': ['', Validators.required],
      'icon': ['', Validators.required],
      'href': ['', Validators.required]
    }))
  }

  deleteSocial(id: number, elementIndex: number): void {
    this.socialsFormArray.removeAt(elementIndex);
    if(id > 0)
      this.idsToDeleteList.push(id);
  }

  formSubmit(): void {

    this.idsToDeleteList.forEach(element => {
      this.socialService.delete(element);
    });
    this.idsToDeleteList = [];

    this.socialsFormArray.value.forEach((element: Social) => {
      var body = {
        'name': element.name,
        'icon': element.icon,
        'href': element.href
      }
      if(element.id > 0) { 
        this.socialService.set(element.id, body);
      } else { 
        this.socialService.add(body);
      }

    });
    this.socialService.saveAll();
  }
}
