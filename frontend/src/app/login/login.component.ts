import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

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

  constructor(private router: Router, private authService: AuthenticationService) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.authService.login(this.loginObj).subscribe({
      next: (res: any) => {
        if(res) {
          this.showSuccessLoginAlert = true;
          setTimeout(() => this.showSuccessLoginAlert = false, 5000);
          this.authService.setToken(res);
          setTimeout(() => this.router.navigateByUrl('/home'), 5000);    
        }
      },
      error: (error: any) => {
        // Handle error response
        console.error('An error occurred:', error);
        if (error.status === 401) {
          this.showFailedLoginAlert = true;
          setTimeout(() => this.showFailedLoginAlert = false, 5000);
        }
        return error;
      }
    });
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
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
