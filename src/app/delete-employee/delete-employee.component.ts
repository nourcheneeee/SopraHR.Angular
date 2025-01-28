import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'; 
import { Employee } from '../employee.model';  
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule], 
})
export class DeleteEmployeeComponent implements OnInit {
  employeeId: number | null = null;  
  employee: Employee | null = null;   
  employeeNotFound: boolean = false;  
  employeeDeleted: boolean = false;  

  constructor(
    private employeeService: EmployeeService,  
    private router: Router                   
  ) {}

  ngOnInit(): void {}

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
        alert('Employé supprimé avec succès');

        this.router.navigate(['/employees']);
      }, error => {
        // Handle error, maybe display an error message
        console.error('Error deleting employee:', error);
        alert('Error deleting employee');
      });
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']); 
  }
}
