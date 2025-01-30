import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../login/auth-service.service';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class HomeComponent implements OnInit {
  currentAdmin: any;  // Variable to hold the current admin data

  constructor(
    private authService: AuthServiceService,
    private route: ActivatedRoute,  
    private router: Router,
    // ActivatedRoute to get the userId from the URL
    private employeeService: EmployeeService  // Service to fetch employee info
  ) {}
  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('userId');
    console.log('URL userId:', userId);  // Log to check if userId is passed in the URL
  
    if (!userId) {
      userId = this.authService.getUserId();  // Retrieve userId from localStorage
      console.log('UserId from localStorage:', userId);  // Log to check if localStorage has userId
    }
  
    if (userId && !isNaN(+userId)) {
      this.employeeService.getEmployeeById(+userId).subscribe(
        (employee) => {
          console.log('Fetched employee data:', employee);  // Log fetched employee data
          this.currentAdmin = employee;
        },
        (error) => {
          console.error('Error fetching admin data:', error);
        }
      );
    } else {
      console.error('Invalid userId:', userId);  // Log invalid userId
    }
  }
  

  logout(): void {
    this.authService.logout();  // Call logout method from AuthService
    this.router.navigate(['/login']); // Redirect to the login page after logout
  }
}