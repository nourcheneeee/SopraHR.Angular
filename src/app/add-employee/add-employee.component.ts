import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule]
})
export class AddEmployeeComponent {
  employee: Employee = new Employee(0, '', '', '', '', '', '', '','','',0,'');

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  addEmployee(): void {
    const newEmployee = this.employeeService.addEmployee(this.employee); 
    this.router.navigate(['/employees']);
  }
  goToHome(): void {
    this.router.navigate(['/home']); 
  }
}
