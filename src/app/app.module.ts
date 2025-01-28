import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';  // Correct path
import { RouterModule } from '@angular/router';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { GestionCongeComponent } from './gestionconge/gestionconge.component';
import { CongedetailsComponent } from './congedetails/congedetails.component';
import { EmployeedetailsemployeeComponent } from './employeedetailsemployee/employeedetailsemployee.component';
import { ListecongeComponent } from './listeconge/listeconge.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './login/auth.interceptor'; 
@NgModule({
  declarations: [
    AppComponent,      
    HomeComponent
    
  ],
  imports: [
    BrowserModule,      
    AppRoutingModule,  
    EmployeeListComponent,  
    FormsModule,
    AddEmployeeComponent,LoginComponent,UpdateEmployeeComponent ,
    DeleteEmployeeComponent , RouterModule, EmployeeDetailsComponent   , HomeEmployeeComponent,
     GestionCongeComponent, CongedetailsComponent   , ListecongeComponent, HttpClientModule, EmployeedetailsemployeeComponent
 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Provide the interceptor
      multi: true  // Allows multiple interceptors to be used
    }
  ],        
  
  bootstrap: [AppComponent]  
})
export class AppModule {}
