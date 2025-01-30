import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../login/auth-service.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class DeleteEmployeeComponent implements OnInit {
  employeeId: number | null = null;
  employee: Employee | null = null;
  employeeNotFound: boolean = false;
  employeeDeleted: boolean = false;
  currentAdmin: Employee | null = null;  // To hold the admin's data

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();  // Get the logged-in admin's userId

    if (userId) {
      // Fetch admin data dynamically using the userId
      this.employeeService.getEmployeeById(+userId).subscribe(
        (employee) => {
          if (employee) {
            this.currentAdmin = employee;  // Store admin data
            console.log('Admin data:', this.currentAdmin);  // For debugging
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

  loadEmployee(): void {
    if (this.employeeId) {
      this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
        const employeeToDelete = employees.find(emp => emp.id === this.employeeId);

        if (employeeToDelete) {
          this.employee = { ...employeeToDelete };
          this.employeeNotFound = false;
          this.employeeDeleted = false;
        } else {
          this.employeeNotFound = true;
          this.employee = null;
        }
      });
    } else {
      this.employeeNotFound = false;
      this.employee = null;
    }
  }

  deleteEmployee(): void {
    if (this.employeeId && this.employee) {
      // Call the deleteEmployeeById method to remove the employee from the backend
      this.employeeService.deleteEmployeeById(this.employeeId).subscribe(() => {
        this.employeeDeleted = true;
        this.employee = null;
        this.employeeNotFound = false;
        alert('Employee deleted successfully');

        this.router.navigate(['/employees']);
      }, error => {
        // Handle error, maybe display an error message
        console.error('Error deleting employee:', error);
        alert('Error deleting employee');
      });
    }
  }

  goToHome(): void {
    const userId = this.authService.getUserId();  // Get the userId from the auth service
    this.router.navigate([`/home/${userId}`]);  // Redirect to the home page for the logged-in admin
  }
  logout(): void {
    this.authService.logout();  // Call the logout method from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}
