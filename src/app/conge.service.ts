import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from './conge';  

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

  
  getLeaveRequestById(congeId: number): Observable<Conge> {
    return this.http.get<Conge>(`${this.apiUrl}/${congeId}`);
  }


  getLeaveRequestsByEmployeeId(employeeId: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

 
  addLeaveRequest(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.apiUrl, conge);
  }

 
  cancelLeaveRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 
  acceptRequest(id: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/accept/${id}`, {}); 
  }

  rejectRequest(id: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/reject/${id}`, {});  
  }
  getEmployeeById(employeeId: number): Observable<any> {
    return this.http.get<any>(`${this.employeeApiUrl}/${employeeId}`);
  }
}
