import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-side-panel-option',
  templateUrl: './side-panel-option.component.html',
  styleUrls: ['./side-panel-option.component.scss']
})
export class SidePanelOptionComponent implements OnInit {

  successMessages: string[] = [];
  errorMessages: string[] = [];

  form!: FormGroup;

  get optionFormArray() {
    return this.form.get('options') as FormArray;
 }

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'options': this.formBuilder.array([])
    });

    this.apiService.getOptions().subscribe({
      next: (v) => {
        v.data.forEach((element: { id: any; name: any; value: any; }) => {
          (this.form.get('options') as FormArray).push(this.formBuilder.group({
            'id': [element.id],
            'name': [element.name],
            'value': [element.value]
          }))
        });
      }
    });
  }

  formSubmit(): void {
    this.successMessages = [];
    this.errorMessages = [];

    this.optionFormArray.value.forEach((element: {id: any, name: any, value: any}) => {
      this.apiService.setOption(element.id, element.value).subscribe({
        next: (v) => {
            this.successMessages.push(v.message ? v.message : 'Update ' + element.name);
        },
        error: (e) => {
          if(e.error.message)
            this.errorMessages.push(e.error.message ? e.error.message : 'Error ' + element.name);
        },
      });
    });
  }
}
