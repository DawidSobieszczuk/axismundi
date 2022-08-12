import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'am-side-panel-option',
  templateUrl: './side-panel-option.component.html',
  styleUrls: ['./side-panel-option.component.scss']
})
export class SidePanelOptionComponent implements OnInit {
  form!: FormGroup;

  get optionsFormArray() {
    return this.form.get('options') as FormArray;
 }

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'options': this.formBuilder.array([])
    });

    this.apiService.getOptions().subscribe({
      next: (v) => {
        v.data.forEach((element: { id: any; name: any; value: any; }) => {
          this.optionsFormArray.push(this.formBuilder.group({
            'id': [element.id, Validators.required],
            'name': [element.name, Validators.required],
            'value': [element.value, Validators.required]
          }))
        });
      }
    });
  }

  formSubmit(): void {
    this.optionsFormArray.value.forEach((element: {id: any, name: any, value: any}) => {
      this.apiService.setOption(element.id, element.value).subscribe({
        next: (v) => {
          this.notificationService.open(v.message || 'Update ' + element.name, 'success');
        },
        error: (e) => {
          this.notificationService.open(e.error.message || 'Error ' + element.name, 'error');
        },
      });
    });
  }
}
