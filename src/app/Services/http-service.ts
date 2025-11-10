import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient:HttpClient) { }
  url!:string;
  getAll<T>():Observable<T> {
    return this.httpClient.get<T>(this.url);
  }
  findById<T>(id:string):Observable<T>{
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }
  insert<T>(data:T):Observable<T>{
    return this.httpClient.post<T>(this.url, data);
  }
  update<T>(id:string, data:T):Observable<T>{
    return this.httpClient.put<T>(`${this.url}/${id}`, data);
  }
  delete<T>(id:string):Observable<T>{
    return this.httpClient.delete<T>(`${this.url}/${id}`);
  }
}
