import { HttpEventType } from '@angular/common/http';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option } from '../models/option';
import { OptionService } from '../services/data/option.service';
import { NotificationService } from '../services/notification.service';

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

  constructor(private optionService: OptionService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

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
    this.optionService.saveAll().subscribe({
      next: (v) => {
        v.forEach((e) => {
          if(e.type == HttpEventType.Response && e.body) {
            this.notificationService.open(e.body.message, 'success');
          }
        })
      }
    });
  }
}
