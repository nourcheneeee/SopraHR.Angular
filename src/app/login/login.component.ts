import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {
    const role = this.authService.getRole();
    const userId = this.authService.getUserId();
    if (role && userId) {
      if (role === 'ROLE_EMPLOYEE') {
        this.router.navigate(['/home-employee', userId]);
      } else if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/home', userId]);
      }
    }
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response && response.token && response.id && response.role) {
          // Store the JWT, userId, and role in localStorage
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('role', response.role);
  
          // Navigate based on the role
          if (response.role === 'ROLE_EMPLOYEE') {
            this.router.navigate(['/home-employee', response.id]);
          } else if (response.role === 'ROLE_ADMIN') {
            this.router.navigate(['/home', response.id]);
          } else {
            this.errorMessage = 'Unknown role.';
          }
        } else {
          this.errorMessage = 'Invalid login credentials. Please try again.';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid login credentials. Please try again.';
      }
    );
  }
}  