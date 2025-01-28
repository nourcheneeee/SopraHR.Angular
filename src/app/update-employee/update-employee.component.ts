import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId: number | null = null;  
  employee: Employee | null = null;  
  employeeNotFound: boolean = false;  

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loadEmployee(): void {
    if (this.employeeId) {
      // Use subscribe to get the list of employees
      this.employeeService.getEmployees().subscribe(employees => {
        const employeeToEdit = employees.find(emp => emp.id === this.employeeId);
        
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
      this.employeeService.updateEmployee(this.employee);  
      alert('Employé mis à jour avec succès');
      this.router.navigate(['/employees']);
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/home']);
  }

  goToHome(): void {
    this.router.navigate(['/home']); 
  }
}
