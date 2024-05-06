import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login;

  showFailedLoginAlert = false;
  showSuccessLoginAlert = false;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  private headers_object = new HttpHeaders()

  onLogin() {
    this.http.post<string>('http://localhost:8080/auth/login', this.loginObj, {headers: this.headers_object, responseType: 'text' as 'json'}).subscribe({
      next: (res: any) => {
        if(res) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (error: any) => {
        // Handle error response
        console.error('An error occurred:', error);
        if (error.status === 401) {
          this.showFailedLoginAlert = true;
          setTimeout(() => this.showFailedLoginAlert = false, 5000);
        } else {
          alert('An error occurred while processing your request');
          this.showFailedLoginAlert = true;
          setTimeout(() => this.showFailedLoginAlert = false, 5000);
        }
      }
    });
  }
  

}

export class Login {
  username: string;
  password: string;
  constructor() {
    this.username = '';
    this.password = '';
  }
  
}
