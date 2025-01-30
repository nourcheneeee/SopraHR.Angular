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
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { DatePipe } from '@angular/common'; 
export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('authToken');
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,      
  ],
  imports: [
    BrowserModule,      
    AppRoutingModule,  
    EmployeeListComponent,
    HomeComponent,  
    FormsModule,
    AddEmployeeComponent,LoginComponent,UpdateEmployeeComponent ,
    DeleteEmployeeComponent , RouterModule, EmployeeDetailsComponent   , HomeEmployeeComponent,
     GestionCongeComponent, CongedetailsComponent   , ListecongeComponent, HttpClientModule, EmployeedetailsemployeeComponent,
     LoginComponent,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Provide the interceptor
      multi: true  
    },
    JwtHelperService, DatePipe
  ],        
  
  bootstrap: [AppComponent]  
})
export class AppModule {}
