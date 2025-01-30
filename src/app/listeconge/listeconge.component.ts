import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';  // Import service
import { Conge } from '../conge';  // Import the Conge model
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { AuthServiceService } from '../login/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listeconge',
  templateUrl: './listeconge.component.html',
  styleUrls: ['./listeconge.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ListecongeComponent implements OnInit {
  selectedEmployee: Employee | null = null;
  leaveRequests: Conge[] = [];
  newLeaveRequest: Conge = { 
    id: this.selectedEmployee?.id!, 
    user: { id: 0 },  
    typeConge: '', 
    dateDebut: '', 
    dateFin: '', 
    status: 'En_attente_de_validation' 
  };
  showLeaveRequestForm: boolean = false;


  constructor(
    private employeeService: EmployeeService,
    private congeService: CongeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    
    if (employeeId) {
      this.loadEmployee(+employeeId);
    } else {
      console.error('No employee ID provided');
      this.router.navigate(['/home-employee']); // Redirect to home if no ID
    }
  }

  loadEmployee(employeeId: number): void {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (employee) => {
        this.selectedEmployee = employee;
  
        // Once the employee is loaded, update the user.id in the leave request
        if (this.selectedEmployee) {
          if (this.selectedEmployee && this.selectedEmployee.id !== null) {
            this.newLeaveRequest.user.id = this.selectedEmployee.id; // Assign the employee's ID to newLeaveRequest
          }
        }
  
  
        this.loadLeaveRequests(employeeId);
      },
      (error) => {
        console.error('Error loading employee details:', error);
      }
    );
  }
  

  loadLeaveRequests(employeeId: number): void {
    this.congeService.getLeaveRequestsByEmployeeId(employeeId).subscribe(
      (requests: Conge[]) => {
        this.leaveRequests = requests;
      },
      (error) => {
        console.error('Error loading leave requests:', error);
      }
    );
  }

  toggleLeaveRequestForm(): void {
    this.showLeaveRequestForm = !this.showLeaveRequestForm;
  }

  requestLeave(): void {
    this.newLeaveRequest.user.id = this.selectedEmployee?.id!; 
    console.log('Sending leave request:', this.newLeaveRequest);
    this.congeService.addLeaveRequest(this.newLeaveRequest).subscribe(
      (response) => {
        console.log('Leave request added:', response);
        this.showLeaveRequestForm = false;
        this.loadLeaveRequests(this.selectedEmployee?.id!);
      },
      (error) => {
        console.error('Error adding leave request:', error);
        if (error.status === 409) {
          alert('The leave request could not be processed because the record was modified by another user.');
        } else if (error.status === 500) {
          alert('An error occurred while adding the leave request. Please try again later.');
        } else {
          alert('An unexpected error occurred.');
        }
      }
    );
    
  }
  

  cancelLeave(id: number): void {
    this.congeService.cancelLeaveRequest(id).subscribe(
      () => {
        this.loadLeaveRequests(this.selectedEmployee?.id!);  // Reload leave requests after cancellation
      },
      (error) => {
        console.error('Error canceling leave request:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();  // Call the logout method from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }

  goToHome(): void {
    const userId = this.authService.getUserId();  // Get the userId from the auth service
    this.router.navigate([`/home-employee/${userId}`]); 
  }
}
