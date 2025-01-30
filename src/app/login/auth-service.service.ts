import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8089/api/auth/login';  
  private usersUrl = 'http://localhost:8089/api/users';  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  /**
   * Login Method
   * @param email User email
   * @param password User password
   * @returns Observable<any>
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { email, password }).pipe(
      map((response) => {
        if (response && response.token ) {
          console.log('Saving userId:', response.id);
          this.saveToken(response.token, response.userId, response.role);
        }
        return response; 
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  /**
   * Save JWT token, User ID, and Role in localStorage
   * @param token JWT token
   * @param userId User ID
   * @param role User role
   */
  saveToken(token: string, userId: string, role: string): void {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  }

  /**
   * Get User ID from localStorage
   * @returns User ID string or null if not found
   */
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  /**
   * Get JWT Token from localStorage
   * @returns JWT token string or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  /**
   * Get User Role from localStorage
   * @returns User role string or null if not found
   */
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/${userId}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch user by ID:', error);
        return throwError(() => new Error('Failed to fetch user by ID.'));
      })
    );
  }

  /**
   * Logout Method (clear all user-related data from localStorage)
   */
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  /**
   * Decodes JWT Token to extract user information (optional)
   * @returns decoded token with user information
   */
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  /**
   * Check if the user is authenticated (i.e., if the token exists and is valid)
   * @returns boolean indicating if the user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
