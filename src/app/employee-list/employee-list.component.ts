import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';  
import { Employee } from '../employee.model';  
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  
import { RouterModule } from '@angular/router'; 
import { Observable } from 'rxjs';  // Import Observable
import { AuthServiceService } from '../login/auth-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule], 
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];  // This will hold the list of employees
  selectedEmployee: Employee | null = null;
  isEditing: boolean = false;
  currentAdmin: Employee | null = null;  // To store the admin data

  constructor(
    private employeeService: EmployeeService, 
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    // Fetch the userId from localStorage or URL
    const userId = this.authService.getUserId();  // This should fetch the userId stored in localStorage

    if (userId) {
      // Fetch the current admin data using the userId
      this.employeeService.getEmployeeById(+userId).subscribe(
        (employee) => {
          if (employee) {
            this.currentAdmin = employee;  // Store the current admin data
            console.log('Fetched admin data:', this.currentAdmin);  // Log the admin data for debugging
          } else {
            console.error('Employee data not found');
          }
        },
        (error) => {
          console.error('Error fetching admin data:', error);
        }
      );
    } else {
      console.error('No userId found in localStorage');
    }

    // Subscribe to get the list of employees
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;  // Assign the employees array once the data is available
      },
      (error) => {
        console.error('Error fetching employees:', error);  // Handle any error
      }
    );
  }

  goToHome(): void {
    const userId = this.authService.getUserId();  // Get the userId from the auth service
    this.router.navigate([`/home/${userId}`]); 
  }

  logout(): void {
    this.authService.logout();  // Call logout method from AuthService to clear session
    this.router.navigate(['/login']);  // Redirect to the login page after logout
  }
}
