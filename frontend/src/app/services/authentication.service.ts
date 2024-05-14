import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url:string = 'http://localhost:8080/auth';

  constructor(private http:HttpClient) { }

  login(login: any) {
    return this.http.post<string>(this.url + '/login', login, {responseType: 'text' as 'json'}).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value);
      })
    );
  }

  register(register: any) {
    return this.http.post<string>(this.url + '/register', register, {responseType: 'text' as 'json'});
  }

  logout() {
    sessionStorage.removeItem('token');
  }

}
