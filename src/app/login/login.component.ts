import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
    hidePassword= true;
  
    constructor( private fb: FormBuilder,
      private snackBar: MatSnackBar,
      private authService: AuthService,
      private router: Router,
      private storage: StorageService){
  
    }
  
    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: [null, [Validators.required], Validators.email],
        password: [null, [Validators.required]]
      })
    }
  
    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword
    }
  
    onSubmit(): void {
      console.log("LoginRequest", this.loginForm.value);
  
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log(response)
          this.snackBar.open("Successfully logged in!", "Close", {duration: 5000});
          if (this.storage.isAdminLoggedIn()) {
            this.router.navigateByUrl('/admin/dashboard');
          }
          else {
            this.router.navigateByUrl('customer/home');
          }
        },
        (error) => {
          console.error(error)
          this.snackBar.open("Login failed. Please try again.", "Close", {duration: 5000, panelClass: 'error-snackbar'});
        }
      )
    }
}
