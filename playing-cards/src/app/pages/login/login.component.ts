import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Credentials, LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private FormBuilder = inject(FormBuilder);
  private LoginService = inject(LoginService);
  private Router = inject(Router);

  private loginSubscription: Subscription | null = null;

  loginFormGroup = this.FormBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  invalidCredentials = false;

  login() {
    this.loginSubscription = this.LoginService.login(
      this.loginFormGroup.value as Credentials
    ).subscribe({
      next: (result: User | null | undefined) => {
        this.navigateHome();
      },
      error: (error) => {
        this.invalidCredentials = true;
      },
    });
  }

  navigateHome() {
    this.Router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
