import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router"
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'am-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  errorMessage!: string;
  userSubjectSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private apiService: ApiService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    // Check is user logged
    if(this.userService.isLogged) {
      this.router.navigate(['/'])
    }

    this.userSubjectSubscription = this.userService.subject.subscribe({
      next: (v) => {
        if(!v) return;
        this.router.navigate(['/']);
      }
    })

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.userSubjectSubscription.unsubscribe();  
  }

  onSubmit(): void {
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
