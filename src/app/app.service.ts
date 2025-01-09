import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AppService {

  constructor(private http: HttpClient) { }  // Inject HttpClient

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('https://fakestoreapi.com/products');
  }
}
