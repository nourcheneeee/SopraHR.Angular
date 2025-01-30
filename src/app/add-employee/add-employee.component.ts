import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { AuthServiceService } from '../login/auth-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();  // Simplified initialization
  currentAdmin: Employee | null = null;  

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();  // Retrieve the logged-in admin's user ID

    if (userId) {
      // Fetch admin details using the userId
      this.employeeService.getEmployeeById(+userId).subscribe(
        (employee) => {
          if (employee) {
            this.currentAdmin = employee;  // Store admin's details
            console.log('Admin data:', this.currentAdmin);  // Debugging log
          } else {
            console.error('Admin data not found');
          }
        },
        (error) => {
          console.error('Error fetching admin data:', error);
        }
      );
    } else {
      console.error('No userId found in localStorage');
    }
  }

  // Method to handle logout
  logout(): void {
    this.authService.logout();  // Call the logout method from auth service
    this.router.navigate(['/login']);  // Navigate to login page
  }

  // Method to handle adding an employee
  addEmployee(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      (newEmployee) => {
        console.log('Employee added successfully:', newEmployee);
        this.router.navigate(['/employees']); // Navigate to the employee list
      },
      (error) => {
        console.error('Error adding employee:', error);
        alert('Failed to add employee! Please try again.');
      }
    );
  }

  // Navigate to home page of the logged-in admin
  goToHome(): void {
    const userId = this.authService.getUserId();  
    if (userId) {
      this.router.navigate([`/home/${userId}`]);  
    } else {
      console.error('No userId found in localStorage');
    }
  }
}
