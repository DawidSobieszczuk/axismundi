import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiResponse } from '../models/responses';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';
import { SidePanelService } from '../services/side-panel.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'am-side-panel-user',
  templateUrl: './side-panel-user.component.html',
  styleUrls: ['./side-panel-user.component.scss']
})
export class SidePanelUserComponent implements OnInit, OnDestroy {
  user!: any;
  showPassword: boolean = false;
  newPassword: boolean = false;

  form!: FormGroup;

  userSubjectSubscription!: Subscription;

  constructor(private apiService: ApiService, private userService: UserService, private sidePanelService: SidePanelService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'email': [this.userService.email, [Validators.email, Validators.required]],
      'password': ['', [Validators.minLength(4), Validators.required]],
      'newPassword': [false]  
    });
    this.form.get('password')?.disable();

    this.userSubjectSubscription = this.userService.subject.subscribe({
      next: (user: User | undefined) => {
        if(user) return;
        this.sidePanelService.isOpened = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubjectSubscription.unsubscribe();
  }

  formSubmit(): void {
    let email = this.form.get('email')?.value == this.user.email ? undefined : this.form.get('email')?.value;
    let pass = this.form.get('password')?.value;

    this.userService.save(email, pass);
  }

  formLogout(): void {
    this.userService.logout();
  }

  formChangeNewPassword(checked: boolean): void 
  {
    if(checked)
      this.form.get('password')?.enable();
    else
      this.form.get('password')?.disable();
  }
}
