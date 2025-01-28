import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';
import { Conge } from '../conge';
import { Router, RouterModule } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service'; 
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestionconge',
  templateUrl: './gestionconge.component.html',
  styleUrls: ['./gestionconge.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class GestionCongeComponent implements OnInit {
  demandesConges: Conge[] = []; // Ensuring that demandesConges is typed as Conge[] (Array of Conge)
  employeeNames: { [key: number]: string } = {};  // Cache employee names to prevent multiple requests

  constructor(
    private congeService: CongeService, // CongeService for leave management
    private router: Router, // Router for navigation
    private employeeService: EmployeeService // EmployeeService for employee data
  ) {}

  ngOnInit(): void {
    // Subscribe to the Observable returned by getLeaveRequests() to get the actual data
    this.congeService.getLeaveRequests().subscribe(
      (requests) => {
        this.demandesConges = requests; // Assign the result to demandesConges
      },
      (error) => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }

  getEmployeeName(employeeId: number): string {
    // Check if we already have the name cached
    if (this.employeeNames[employeeId]) {
      return this.employeeNames[employeeId];
    }

    // If not, fetch employee by ID and cache the name
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (employee) => {
        if (employee) {
          this.employeeNames[employeeId] = `${employee.firstName} ${employee.lastName}`;
        }
      },
      (error) => {
        console.error('Error fetching employee:', error);
        this.employeeNames[employeeId] = 'Unknown';
      }
    );

    return 'Loading...'; // Return 'Loading...' while waiting for the async call
  }

  acceptRequest(id: number): void {
    this.congeService.acceptRequest(id);
    // Re-fetch the leave requests after accepting
    this.congeService.getLeaveRequests().subscribe(
      (requests) => {
        this.demandesConges = requests; // Assign updated leave requests
      },
      (error) => {
        console.error('Error fetching updated leave requests:', error);
      }
    );
  }

  rejectRequest(id: number): void {
    this.congeService.rejectRequest(id);
    // Re-fetch the leave requests after rejecting
    this.congeService.getLeaveRequests().subscribe(
      (requests) => {
        this.demandesConges = requests; // Assign updated leave requests
      },
      (error) => {
        console.error('Error fetching updated leave requests:', error);
      }
    );
  }

  showLeaveDetails(conge: Conge): void {
    this.router.navigate(['/congedetails', conge.id]); 
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
