import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Tool } from './tool';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  // get all entries
  getAllTools(): Observable<Tool[]> {
    let endpoint = '/tools';
    return this.http.get<Tool[]>(this.backendUrl + endpoint);
  }
}
