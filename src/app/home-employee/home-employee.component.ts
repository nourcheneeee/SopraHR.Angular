import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model'; 
import { EmployeeService } from '../employee.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-employee',
  templateUrl: './home-employee.component.html',
  styleUrls: ['./home-employee.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule], 
})
export class HomeEmployeeComponent implements OnInit {
  employee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    const employeeId = 1; 
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (employee: Employee) => {
        this.employee = employee; // Assign the employee object to the variable
      },
      (error) => {
        console.error('Error fetching employee:', error); // Handle any errors that might occur
      }
    );
  }
}
