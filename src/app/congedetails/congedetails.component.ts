import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CongeService } from '../conge.service';
import { Conge } from '../conge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

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

  constructor(
    private route: ActivatedRoute,
    private congeService: CongeService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const congeId = this.route.snapshot.paramMap.get('id');
    if (congeId) {
      // Subscribe to the Observable to get the Conge details
      this.congeService.getLeaveRequestById(+congeId).subscribe(
        (conge) => {
          this.congeDetails = conge;  // Assign the fetched Conge data
          if (this.congeDetails) {
            // Fetch the employee details once we have the Conge data
            this.employeeService.getEmployeeById(this.congeDetails.EmployeeId).subscribe(
              (employee) => {
                if (employee) {
                  // Set the employee name after fetching the employee data
                  this.employeeName = `${employee.firstName} ${employee.lastName}`;
                }
              },
              (error) => {
                console.error('Error fetching employee:', error);
                this.employeeName = 'Unknown';
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching conge:', error);
          this.congeDetails = undefined;
        }
      );
    }
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
