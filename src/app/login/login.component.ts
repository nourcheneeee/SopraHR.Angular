import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';  // Used to return an observable when error occurs

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email: string = '';               // Store email input
  password: string = '';            // Store password input
  loginError: string | null = null;  // Store error message

  constructor(private authService: AuthServiceService, private router: Router) {}

  /**
   * Handles the login process when the form is submitted.
   */
  onLogin(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).pipe(
        catchError((error) => {
          this.loginError = 'Login failed. Please check your credentials and try again.';
          console.error('Login failed:', error);  // Optionally log error for debugging
          return of(null);  // Prevent the error from propagating further
        })
      ).subscribe((response) => {
        if (response && response.token) {
          this.authService.saveToken(response.token);  // Save token to localStorage
          this.router.navigate(['/home']);             // Redirect to the home page
        } else {
          this.loginError = 'Invalid login credentials. Please try again.';  // Custom error message
        }
      });
    } else {
      this.loginError = 'Please enter both email and password.';  // Validate inputs before making the request
    }
  }
}
