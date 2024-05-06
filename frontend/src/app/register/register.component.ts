import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule],
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerObj: Register;

  showFailedRegisterAlert = false;
  showSuccessRegisterAlert = false;


  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    this.registerObj = new Register();
  }

  private headers_object = new HttpHeaders()

  onRegister() {
    this.http.post<string>('http://localhost:8080/auth/register', this.registerObj, {headers: this.headers_object, responseType: 'text' as 'json'}).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res) {
          this.showSuccessRegisterAlert = true;
          setTimeout(() => 
            this.showSuccessRegisterAlert = false, 5000);
          setTimeout(() =>
            this.router.navigateByUrl('/login'), 5000);
        }
      },
      error: (error: any) => {
        // Handle error response
        console.error('An error occurred:', error);
        if (error.status === 401) {
          this.showFailedRegisterAlert = true;
          setTimeout(() => this.showFailedRegisterAlert = false, 5000);
        } else {
          this.showFailedRegisterAlert = true;
          setTimeout(() => this.showFailedRegisterAlert = false, 5000);
        }
      }
    });
  }

}
export class Register {
  username: string;
  password: string;
  constructor() {
    this.username = '';
    this.password = '';
  }
  
}