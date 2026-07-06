import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }

  // NOTE for reviewer , I changed the BE side cors policy and added port 4200 to allow requests.

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  private depCache = new Map<string, string[]>();

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.baseUrl}/packages`)
  }


}
