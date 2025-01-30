import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../login/auth-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
})
export class EmployeeDetailsComponent implements OnInit {
  selectedEmployee: Employee | null = null;
  currentAdmin: Employee | null = null;  // To store the admin's details

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService  // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Fetch the userId from localStorage or URL
    const userId = this.authService.getUserId();  // This gets the userId from localStorage

    // Fetch the current admin data if the userId exists
    if (userId) {
      this.employeeService.getEmployeeById(+userId).subscribe(
        (employee) => {
          if (employee) {
            this.currentAdmin = employee;  // Store the current admin's details
            console.log('Fetched admin data:', this.currentAdmin);  // Log for debugging
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

    // Fetch the employee details using the ID from the route
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.employeeService.getEmployeeById(+employeeId).subscribe(
        (employee) => {
          this.selectedEmployee = employee;  // Store the fetched employee data
        },
        (error) => {
          console.error('Error fetching employee details:', error);  
        }
      );
    }
  }

  goToHome(): void {
    this.router.navigate(['/employees']);  // Navigate back to the employee list page
  }
}
