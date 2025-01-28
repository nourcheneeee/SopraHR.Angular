import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:8089/api/auth/login';  // Backend URL

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Logs in the user by sending email and password to the backend
   * @param email User's email
   * @param password User's password
   * @returns Observable of login response (token or error)
   */
  login(email: string, password: string): Observable<any> {
    const loginPayload = { email, password };  // Use email instead of username

    // Make POST request and handle any errors with catchError
    return this.http.post<any>(this.apiUrl, loginPayload).pipe(
      tap((response) => {
        // Save token if available in the response (optional)
        if (response.token) {
          this.saveToken(response.token);
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);  // Log error for debugging
        return throwError(() => new Error('Login failed, please try again later.'));
      })
    );
  }

  /**
   * Saves the JWT token to localStorage
   * @param token JWT token to be saved
   */
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Retrieves the saved JWT token from localStorage
   * @returns JWT token or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Checks if the user is authenticated based on the presence of the token
   * @returns true if authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    return !!this.getToken();  // Check if token exists in localStorage
  }

  /**
   * Logs out the user by removing the token and redirecting to login page
   */
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
