import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Option } from '../models/option';
import { OptionService } from '../services/data/option.service';

@Component({
  selector: 'am-side-panel-option',
  templateUrl: './side-panel-option.component.html',
  styleUrls: ['./side-panel-option.component.scss']
})
export class SidePanelOptionComponent implements OnInit, AfterContentInit {
  form!: FormGroup;

  get optionsFormArray() {
    return this.form.get('options') as FormArray;
 }

  constructor(public optionService: OptionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'options': this.formBuilder.array([])
    });
  }

  ngAfterContentInit(): void {
    this.optionService.getAll().forEach((element: Option) => {
      this.optionsFormArray.push(this.formBuilder.group({
        'id': [element.id, Validators.required],
        'name': [element.name, Validators.required],
        'value': [element.value, Validators.required]
      }))
    });
  }

  formSubmit(): void {
    this.optionsFormArray.value.forEach((element: Option) => {
      this.optionService.set(element.id, element)
    });
    this.optionService.saveAll();
  }
}
