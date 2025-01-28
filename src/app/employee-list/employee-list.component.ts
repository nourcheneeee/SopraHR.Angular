import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';  
import { Employee } from '../employee.model';  
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  
import { RouterModule } from '@angular/router'; 
import { Observable } from 'rxjs';  // Import Observable

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

  constructor(private employeeService: EmployeeService, private router: Router) {}  

  ngOnInit(): void {
    // Subscribe to the observable to get the employees
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
    this.router.navigate(['/home']); 
  }
}
