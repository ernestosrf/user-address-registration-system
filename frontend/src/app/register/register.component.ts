import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule],
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  showFailedRegisterAlert = false;
  showSuccessRegisterAlert = false;


  constructor(
    private router: Router, 
    private authService: AuthenticationService, 
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onRegister() {
    if (this.registerForm.invalid) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
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
        if (error.status === 409) {
          this.showFailedRegisterAlert = true;
          setTimeout(() => this.showFailedRegisterAlert = false, 5000);
        }
        return error;
      }
    });
  }

}