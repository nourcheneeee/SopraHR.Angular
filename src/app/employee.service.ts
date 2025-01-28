import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8089/api/users';  

  constructor(private http: HttpClient) {}

  
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

 
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }


  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

 
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

 
  deleteEmployeeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 
  getCurrentEmployee(): Employee | null {
 
    return JSON.parse(localStorage.getItem('currentEmployee') || 'null');
  }


  setCurrentEmployee(employee: Employee): void {
    localStorage.setItem('currentEmployee', JSON.stringify(employee)); 
  }

  isAdmin(): boolean {
    const currentEmployee = this.getCurrentEmployee();
    return currentEmployee?.role === 'admin';
  }
}
