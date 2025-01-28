import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-employeedetailsemployee',
  templateUrl: './employeedetailsemployee.component.html',
  styleUrls: ['./employeedetailsemployee.component.css'],

})
export class EmployeedetailsemployeeComponent implements OnInit {

  selectedEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const employeeId = 1; // Hardcoded for now to fetch employee with ID 1
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (employee) => {
        console.log('Employee fetched:', employee);  // Log the employee data
        this.selectedEmployee = employee;
      },
      (error) => {
        console.error('Error fetching employee:', error);
      }
    );
  }
  

  goToHome(): void {
    this.router.navigate(['/home-employee']);
  }
}
