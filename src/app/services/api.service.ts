import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }

  private http = inject(HttpClient);
  private baseUrl = 'mock-api';

  private depCache = new Map<string, string[]>();

  getPackeges(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.baseUrl}/packages`)
  }

  
}
