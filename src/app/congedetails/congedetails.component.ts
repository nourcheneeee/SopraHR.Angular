import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CongeService } from '../conge.service';
import { Conge } from '../conge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { AuthServiceService } from '../login/auth-service.service';

@Component({
  selector: 'app-congedetails',
  templateUrl: './congedetails.component.html',
  styleUrls: ['./congedetails.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule], 
})
export class CongedetailsComponent implements OnInit {
  congeDetails: Conge | undefined;
  employeeName: string = '';
  currentAdmin: any; 
  constructor(
    private route: ActivatedRoute,
    private congeService: CongeService,
    private employeeService: EmployeeService,
    private router: Router,
    private authService:AuthServiceService
  ) {}

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('userId');
    
    // Log the userId to check if it's being fetched correctly
    console.log('User ID from URL or localStorage:', userId);
  
    if (!userId) {
      userId = this.authService.getUserId();  // Retrieve userId from localStorage
      console.log('User ID from localStorage:', userId);
    }
  
    if (userId && !isNaN(+userId)) {
      // Fetch the current admin data using userId
      this.employeeService.getEmployeeById(+userId).subscribe(
        (employee) => {
          console.log('Fetched admin data:', employee);  // Log fetched admin data
          if (employee) {
            this.currentAdmin = employee;
          } else {
            console.error('Employee data not found');
          }
        },
        (error) => {
          console.error('Error fetching admin data:', error);
        }
      );
    
      // Fetch leave request details using the conge ID from URL
      const congeId = this.route.snapshot.paramMap.get('id');
      console.log('Fetching conge details for ID:', congeId);  // Log congeId to check if it's correct
  
      if (congeId) {
        this.congeService.getLeaveRequestById(+congeId).subscribe(
          (conge) => {
            console.log('Fetched leave request details:', conge);  // Log fetched conge details
            this.congeDetails = conge;
            if (this.congeDetails) {
              this.employeeService.getEmployeeById(this.congeDetails.user.id).subscribe(
                (employee) => {
                  console.log('Fetched employee name:', `${employee.firstName} ${employee.lastName}`);  // Log employee name
                  if (employee) {
                    this.employeeName = `${employee.firstName} ${employee.lastName}`;
                  }
                },
                (error) => {
                  console.error('Error fetching employee name:', error);
                  this.employeeName = 'Unknown';
                }
              );
            }
          },
          (error) => {
            console.error('Error fetching conge details:', error);
            this.congeDetails = undefined;
          }
        );
      }
    } else {
      console.error('Invalid userId:', userId);
    }
  }
  
  

  showLeaveDetails(conge: Conge): void {
    this.router.navigate(['/congedetails', conge.id]);
    this.congeService.getLeaveRequestById(conge.id).subscribe(
      (details) => {
        this.congeDetails = details;
        console.log('Conge details loaded:', this.congeDetails);  // Check the value of statut here
      },
      (error) => {
        console.error('Error loading leave request details:', error);
      }
    );
  }
  
  logout(): void {
    this.authService.logout();  // Call the logout method from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }

  acceptRequest(id: number): void {
    this.congeService.acceptRequest(id);
    this.router.navigate(['/gestionconge']);
  }

  rejectRequest(id: number): void {
    this.congeService.rejectRequest(id);
    this.router.navigate(['/gestionconge']);
  }

  goToHome(): void {
    this.router.navigate(['/gestionconge']);
  }
}
