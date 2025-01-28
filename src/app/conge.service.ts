import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from './conge';
import { Employee } from './employee.model';


@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl = 'http://localhost:8089/api/conges';  
  private employeeApiUrl = 'http://localhost:8089/api/users';  

  constructor(private http: HttpClient) {}


  getLeaveRequests(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl);
  }

  
  getLeaveRequestsByEmployeeId(employeeId: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/employee/${employeeId}`);
  }


  getLeaveRequestById(id: number): Observable<Conge> {
    return this.http.get<Conge>(`${this.apiUrl}/${id}`);
  }


  addLeaveRequest(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.apiUrl, conge);
  }

 
  acceptRequest(id: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/${id}`, { statut: 'Validé' });
  }

  
  rejectRequest(id: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/${id}`, { statut: 'Refusé' });
  }


  cancelLeaveRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 
  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeeApiUrl}/${employeeId}`);
  }
}
