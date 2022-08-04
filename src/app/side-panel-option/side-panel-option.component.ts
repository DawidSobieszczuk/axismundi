import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'am-side-panel-option',
  templateUrl: './side-panel-option.component.html',
  styleUrls: ['./side-panel-option.component.scss']
})
export class SidePanelOptionComponent implements OnInit {

  options!: any;
  successMessage: string = '';
  errorMessage: string = '';

  form!: FormGroup;

  get optionControls() {
    return this.form.get('options') as FormArray;
 }

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'options': this.formBuilder.array([])
    });

    this.apiService.getOptions().subscribe({
      next: (v) => {
        this.options = v.data;
        this.options.forEach((element: { id: any; name: any; value: any; }) => {
          (this.form.get('options') as FormArray).push(this.formBuilder.group({
            'id': [element.id],
            'name': [element.name],
            'value': [element.value]
          }))
        });
      }
    });

    console.log(this.optionControls);
  }

  formSubmit(): void {
    console.log('ok');

    let optionsData = this.form.get('options')?.value;
    let errorCount = 0;
    let errorMessages = '';
    let successMessages = '';

    this.successMessage = '';
    this.errorMessage = '';

    optionsData.forEach((element: {id: any, value: any}) => {
      this.apiService.setOption(element.id, element.value).subscribe({
        next: (v) => {
          if(v.message)
            successMessages += v.message + '\n';
        },
        error: (e) => { 
          errorCount++;
          if(e.error.message)
            errorMessages += e.error.message + '\n';
        },
      });
    });

    if (errorCount == 0)
      this.successMessage = successMessages.length > 0 ? successMessages : "Succes";
    else
      this.errorMessage = errorMessages.length > 0 ? errorMessages : "Error";
  }
}
