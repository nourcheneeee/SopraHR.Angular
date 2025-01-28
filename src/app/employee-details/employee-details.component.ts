import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
})
export class EmployeeDetailsComponent implements OnInit {

  selectedEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
    
      this.employeeService.getEmployeeById(+employeeId).subscribe(
        (employee) => {
          this.selectedEmployee = employee;  
        },
        (error) => {
          console.error('Error fetching employee details:', error);  
        }
      );
    }
  }

  goToHome(): void {
    this.router.navigate(['/employees']);
  }
}
