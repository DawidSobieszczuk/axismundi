import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'am-side-panel-social',
  templateUrl: './side-panel-social.component.html',
  styleUrls: ['./side-panel-social.component.scss']
})
export class SidePanelSocialComponent implements OnInit {

  form!: FormGroup;
  idsToDeleteList: number[] = [];
  
  get socialsFormArray() {
    return this.form.get('socials') as FormArray;
  }
  
  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'socials': this.formBuilder.array([])
    });

    this.apiService.getSocials().subscribe({
      next: (v) => {
        v.data.forEach((element: {id: any, name: any, icon: any, href: any}) => {
          this.socialsFormArray.push(this.formBuilder.group({
            'id': [element.id],
            'name': [element.name, Validators.required],
            'icon': [element.icon, Validators.required],
            'href': [element.href, Validators.required]
          }))
        });
      }
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
      this.apiService.deleteSocial(element).subscribe({
        next: (v) => {          
            this.notificationService.open(v.message ? v.message : 'Element remove', 'success');
        },
        error: (e) => { 
          this.notificationService.open(e.error.message ? e.error.message : 'Cannot remove element', 'error');
        }
      });
    });

    this.idsToDeleteList = [];

    this.socialsFormArray.value.forEach((element: {id: any, name: any; icon: any, href: any}, index: any) => {
      var body = {
        'name': element.name,
        'icon': element.icon,
        'href': element.href
      }
      if(element.id > 0) { // update
        this.apiService.setSocial(element.id, body).subscribe({
          next: (v) => { 
            this.notificationService.open(v.message ? v.message : 'Update ' + element.name, 'success');
          },
          error: (e) => { 
            this.notificationService.open(e.error.message ? e.error.message : 'Cannot update ' + element.name, 'error');
          }
        });
      } else { // add new
        this.apiService.addSocial(body).subscribe({
          next: (v) => { 
            this.socialsFormArray.value[index].id = v.data.id;
            this.notificationService.open(v.message ? v.message : 'Add ' + element.name, 'success');
          },
          error: (e) => { 
            this.notificationService.open(e.error.message ? e.error.message : 'Cannot add ' + element.name, 'error');
          }
        });
      }
    });
  }
}
