import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'am-side-panel-user',
  templateUrl: './side-panel-user.component.html',
  styleUrls: ['./side-panel-user.component.scss']
})
export class SidePanelUserComponent implements OnInit {

  user!: any;
  showPassword: boolean = false;
  newPassword: boolean = false;

  form!: FormGroup;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'email': ['', Validators.email],
      'password': ['', Validators.minLength(4)],
      'newPassword': [false]  
    });
    this.form.get('password')?.disable();

    this.apiService.getCurrentLoggedUser().subscribe({
      next: (v) => {
        this.user = v.data;
        this.form.get('email')?.setValue(v.data.email);
      }
    });
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
    this.apiService.logout().subscribe({
      next: () => window.location.reload()
    });
  }

  formChangeNewPassword(checked: boolean): void 
  {
    if(checked)
      this.form.get('password')?.enable();
    else
      this.form.get('password')?.disable();
  }
}
