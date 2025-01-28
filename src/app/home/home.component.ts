import { Component } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent {




  constructor(private employeeService: EmployeeService) {}
  currentAdmin: Employee | null = null;

  ngOnInit(): void {
    this.currentAdmin = this.employeeService.getCurrentEmployee();
  }
  viewEmployees() {
    alert("Le bouton Afficher tous les employés a été cliqué.");
  }

  addEmployee() {
    alert("Le bouton Ajouter un employé a été cliqué.");
  }

  modifyEmployee() {
    alert("Le bouton Modifier un employé a été cliqué.");
  }

  deleteEmployee() {
    alert("Le bouton Supprimer un employé a été cliqué.");
  }
}
