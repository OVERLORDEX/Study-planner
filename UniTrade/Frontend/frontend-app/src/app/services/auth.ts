import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  message: string;
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  register(data: { username: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, data);
  }

  login(data: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, data);
  }

  logout(): Observable<any> {
    const refresh = typeof window !== 'undefined' ? sessionStorage.getItem('refresh') : null;
    return this.http.post(`${this.apiUrl}/logout/`, { refresh });
  }

  saveTokens(access: string, refresh: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('access', access);
      sessionStorage.setItem('refresh', refresh);
    }
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('access');
      sessionStorage.removeItem('refresh');
    }
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('access');
    }
    return false;
  }
}