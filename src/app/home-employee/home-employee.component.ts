import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model'; 
import { EmployeeService } from '../employee.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../login/auth-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule], 
})
export class HomeEmployeeComponent implements OnInit {
  userId: string | null = null;
  employee: Employee | null = null; // Define the employee property
  errorMessage: string = ''; 
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userId = userId;
      console.log('Logged in user ID:', this.userId);
      const numericUserId = Number(userId); // Convert userId to number
      if (!isNaN(numericUserId)) {
        this.employeeService.getEmployeeById(numericUserId).subscribe(
          (employee) => {
            this.employee = employee;
          },
          (error) => {
            this.errorMessage = 'Failed to load employee info.';
            console.error('Failed to load employee info:', error);
          }
        );
      } else {
        this.errorMessage = 'Invalid userId: ' + userId;
        console.error('Invalid userId:', userId);
      }
    } else {
      this.errorMessage = 'Invalid userId: ' + userId;
      console.error('Invalid userId:', userId);
    }
  }
  
  /**
   * Handle Logout
   */
  logout(): void {
    this.authService.logout();  // Call the logout method from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}
