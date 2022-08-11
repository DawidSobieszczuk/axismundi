import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  userIsLoggedSubjectSubscription!: Subscription;

  constructor(private apiService: ApiService, private userService: UserService, private sidePanelService: SidePanelService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userIsLoggedSubjectSubscription = this.userService.isLoggedSubject.subscribe({
      next: (v) => {
        if(v) return;
        this.sidePanelService.isOpened = false;
      }
    });

    this.form = this.formBuilder.group({
      'email': [this.userService.email, Validators.email],
      'password': ['', Validators.minLength(4)],
      'newPassword': [false]  
    });
    this.form.get('password')?.disable();

  }

  ngOnDestroy(): void {
    this.userIsLoggedSubjectSubscription.unsubscribe();
  }

  formSubmit(): void {
    let email = this.form.get('email')?.value == this.user.email ? undefined : this.form.get('email')?.value;
    let pass = this.form.get('password')?.value;
    let body = {
      'email': email,
      ...(this.form.get('newPassword')?.value && {password: pass }),
      ...(this.form.get('newPassword')?.valid && {password_confirmation: pass }),
    };

    this.apiService.setCurretLoggedUser(body).subscribe({
      next: (v) =>
        this.notificationService.open(v.message ? v.message : "Update user", 'success'),
      error: (e) => 
      this.notificationService.open(e.error.message ? e.error.message : "Cannot update user", 'error'),
    });

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
