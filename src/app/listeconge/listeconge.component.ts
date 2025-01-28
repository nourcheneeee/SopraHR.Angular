import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';  
import { Conge } from '../conge';  
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model'; 
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listeconge',
  templateUrl: './listeconge.component.html',
  styleUrls: ['./listeconge.component.css'],
  imports: [CommonModule, FormsModule, RouterModule], 
})
export class ListecongeComponent implements OnInit {
  leaveRequests: Conge[] = [];  
  newLeaveRequest: Conge = { id: 0, EmployeeId: 0, typeConge: '', dateDebut: '', dateFin: '', statut: 'En attente' };  
  showLeaveRequestForm: boolean = false;  
  selectedEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    private congeService: CongeService,
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      // Subscribe to the Observable to get the employee data asynchronously
      this.employeeService.getEmployeeById(+employeeId).subscribe(employee => {
        this.selectedEmployee = employee;
        // After getting the employee, load their leave requests
        this.loadLeaveRequests();
      });
    }
  }

  loadLeaveRequests(): void {
    if (this.selectedEmployee) {
      // Subscribe to the Observable returned by the service
      this.congeService.getLeaveRequestsByEmployeeId(this.selectedEmployee.id).subscribe((requests: Conge[]) => {
        this.leaveRequests = requests;  // Assign the result to the leaveRequests array
      });
    }
  }

  toggleLeaveRequestForm(): void {
    this.showLeaveRequestForm = !this.showLeaveRequestForm;  
  }

  requestLeave(): void {
    if (this.selectedEmployee) {
      this.newLeaveRequest.EmployeeId = this.selectedEmployee.id;  // Set EmployeeId properly
      this.congeService.addLeaveRequest(this.newLeaveRequest).subscribe(() => {
        this.showLeaveRequestForm = false;  
        this.loadLeaveRequests();  // Reload leave requests after adding a new one
      });
    }
  }

  cancelLeave(id: number): void {
    this.congeService.cancelLeaveRequest(id).subscribe(() => {
      this.loadLeaveRequests();  // Reload leave requests after cancellation
    });
  }

  goToHome(): void {
    this.router.navigate(['/home-employee']);
  }
}
