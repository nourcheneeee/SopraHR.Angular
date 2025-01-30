import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';
import { Conge } from '../conge';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service'; 
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import{AuthServiceService} from '../login/auth-service.service';
@Component({
  selector: 'app-gestionconge',
  templateUrl: './gestionconge.component.html',
  styleUrls: ['./gestionconge.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class GestionCongeComponent implements OnInit {
  demandesConges: Conge[] = []; 
  employeeNames: { [key: number]: string } = {};  
  currentAdmin: any; 
  errorMessage: string = '';
  statusMap: { [key: string]: string } = {
    'EN_ATTENTE_DE_VALIDATION': 'En_attente_de_validation',
    'VALIDE': 'Validé',
    'REFUSE': 'Refusé',
  };
  constructor(
    private congeService: CongeService, 
    private router: Router, 
    private employeeService: EmployeeService ,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    
  ) {}
  ngOnInit(): void {
    this.loadLeaveRequests();
    
    let userId = this.route.snapshot.paramMap.get('userId');
    
    
    if (!userId) {
      userId = this.authService.getUserId();  
    }
    
    
    this.congeService.getLeaveRequests().subscribe(
      (requests) => {
        this.demandesConges = requests; 
      },
      (error) => {
        console.error('Error fetching all leave requests:', error);
      }
    );
    
    
    if (userId && !isNaN(+userId)) {
      this.employeeService.getEmployeeById(+userId).subscribe(
        (employee) => {
          if (employee) {
            this.currentAdmin = employee;  
            console.log('Fetched admin data:', this.currentAdmin); 
          } else {
            console.error('Employee data not found');
          }
        },
        (error) => {
          console.error('Error fetching admin data:', error);
        }
      );
    } else {
      console.error('Invalid userId:', userId);  
    }
  }
  getStatusText(status: string): string {
    return this.statusMap[status] || status;  // Default to the original status if not found
  }

  getEmployeeName(userId: number): string {
    if (this.employeeNames[userId]) {
      return this.employeeNames[userId];
    }

    this.employeeService.getEmployeeById(userId).subscribe(
      (employee) => {
        if (employee) {
          this.employeeNames[userId] = `${employee.firstName} ${employee.lastName}`;
        }
      },
      (error) => {
        console.error('Error fetching employee:', error);
        this.employeeNames[userId] = 'Unknown';
      }
    );

    return 'Loading...';
  }

  loadLeaveRequests(): void {
    this.congeService.getLeaveRequests().subscribe(
      (leaveRequests) => {
        this.demandesConges = leaveRequests;
      },
      (error) => {
        console.error('Error loading leave requests:', error);
      }
    );
  }

  acceptRequest(id: number): void {
    console.log('')
    this.congeService.acceptRequest(id).subscribe(
      (updatedLeaveRequest) => {
        console.log('Leave request accepted:', updatedLeaveRequest);
        this.loadLeaveRequests();
      },
      (error) => {
        console.error('Error accepting leave request:', error);
      }
    );
  }

  rejectRequest(id: number): void {
    // Call the service to reject the leave request
    this.congeService.rejectRequest(id).subscribe(
      (updatedLeaveRequest) => {
        console.log('Leave request rejected:', updatedLeaveRequest);
        // After rejecting, reload the leave requests list
        this.loadLeaveRequests();
      },
      (error) => {
        console.error('Error rejecting leave request:', error);
      }
    );
  }

  

  showLeaveDetails(conge: Conge): void {
    this.router.navigate(['/congedetails', conge.id]); 
  }
  logout(): void {
    this.authService.logout();  
    this.router.navigate(['/login']); 
  }

  goToHome(): void {
    const userId = this.authService.getUserId(); 
    this.router.navigate([`/home/${userId}`]); 
  }
}
