import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs'; 
import { AuthServiceService } from '../login/auth-service.service';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common'; 
@Component({
  selector: 'app-employeedetailsemployee',
  templateUrl: './employeedetailsemployee.component.html',
  styleUrls: ['./employeedetailsemployee.component.css'],
  standalone: true,
  imports: [RouterModule, DatePipe],
})
export class EmployeedetailsemployeeComponent implements OnInit {
  errorMessage: string = ''; 
  selectedEmployee: Employee | null = null;
  userId: string | null = null;
  constructor(
    private employeeService: EmployeeService, 
    private router: Router, 
    private route: ActivatedRoute,
        private authService: AuthServiceService,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userId = userId;
      console.log('Logged in user ID:', this.userId);
      const numericUserId = Number(userId); // Convert userId to number
      if (!isNaN(numericUserId)) {
        this.employeeService.getEmployeeById(numericUserId).subscribe(
          (employee) => {
            this. selectedEmployee = employee;
          },
          (error) => {
            this.errorMessage = 'Failed to load employee info.';
            console.error('Failed to load employee info:', error);
          }
        );
      } else {
        this.errorMessage = 'Invalid userId: ' + userId;
        console.error('Invalid userId:', userId);
      }
    } else {
      this.errorMessage = 'Invalid userId: ' + userId;
      console.error('Invalid userId:', userId);
    }
  }
  
  /**
   * Handle Logout
   */
  logout(): void {
    this.authService.logout();  // Call the logout method from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }

  goToHome(): void {
    const userId = this.authService.getUserId();  // Get the userId from the auth service
    this.router.navigate([`/home-employee/${userId}`]); 
  }
}
