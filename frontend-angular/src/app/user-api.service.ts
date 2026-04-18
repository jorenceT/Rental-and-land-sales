import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateUserPayload {
  fullName: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'seller' | 'agent';
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly baseUrl = 'http://localhost:4000/api';

  constructor(private readonly http: HttpClient) {}

  createUser(payload: CreateUserPayload): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/users`, payload);
  }
}
