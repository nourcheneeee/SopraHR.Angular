import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../login/auth-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId: number | null = null;
  employee: Employee | null = null;
  employeeNotFound: boolean = false;
  currentAdmin: Employee | null = null;  // To hold the current admin's data

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();  // Get the logged-in admin's userId

    if (userId) {
      // Fetch the current admin's details dynamically using the userId
      this.employeeService.getEmployeeById(+userId).subscribe(
        (employee) => {
          if (employee) {
            this.currentAdmin = employee;  // Store the admin's data
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
      // Use subscribe to get the list of employees
      this.employeeService.getEmployees().subscribe((employees) => {
        const employeeToEdit = employees.find((emp) => emp.id === this.employeeId);

        if (employeeToEdit) {
          this.employee = { ...employeeToEdit };  // Make a copy to avoid modifying the original array
          this.employeeNotFound = false;
        } else {
          this.employeeNotFound = true;
          this.employee = null;
        }
      });
    }
  }

  updateEmployee(): void {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        (updatedEmployee) => {
          console.log('Employee updated successfully:', updatedEmployee);  
          alert('Employee updated successfully');
          this.router.navigate(['/employees']);  
        },
        (error) => {
          console.error('Error updating employee:', error);  
          alert('There was an error updating the employee. Please try again.');
        }
      );
    }
  }
  


  goToHome(): void {
    const userId = this.authService.getUserId();  // Get the userId from the auth service
    this.router.navigate([`/home/${userId}`]);  // Navigate to the home page for the logged-in admin
  }
}
