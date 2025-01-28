import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component'; 
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { GestionCongeComponent } from './gestionconge/gestionconge.component';
import { CongedetailsComponent } from './congedetails/congedetails.component';
import { EmployeedetailsemployeeComponent } from './employeedetailsemployee/employeedetailsemployee.component';
import { ListecongeComponent } from './listeconge/listeconge.component';
const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home-employee', component:  HomeEmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'update-employee', component: UpdateEmployeeComponent },
  { path: 'delete-employee', component: DeleteEmployeeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
  { path: 'gestionconge', component: GestionCongeComponent },
  { path: 'congedetails/:id', component: CongedetailsComponent }, 
  { path: 'employee-details-emp/:id', component:EmployeedetailsemployeeComponent},
  { path: 'listeconge/:id', component:ListecongeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
