import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string | null = null;

  private url:string = 'http://localhost:8080/auth';

  constructor(private http:HttpClient) { }

  login(login: any) {
    return this.http.post<string>(this.url + '/login', login, {responseType: 'text' as 'json'});
  }

  register(register: any) {
    return this.http.post<string>(this.url + '/register', register, {responseType: 'text' as 'json'});
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }

}
