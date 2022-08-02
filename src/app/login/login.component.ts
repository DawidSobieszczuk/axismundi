import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router"

@Component({
  selector: 'am-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    // Check is user logged
    this.apiService.getCurrentLoggedUser().subscribe({
      next: (v) => {
        this.router.navigate(['/']);
      },
      error: () => {}
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.apiService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (v) => {
        localStorage.setItem('userToken', v.data.token);
        this.router.navigate(['/']);
        window.location.reload();
      },
      error: (e) => {
          this.errorMessage = e.error.message;
      }
    });
  }
}
