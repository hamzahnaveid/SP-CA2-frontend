import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signUpForm!: FormGroup;
  hidePassword= true;

  constructor( private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router){

  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required], Validators.email],
      password: [null, [Validators.required]],
      isAdmin: [false]
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
  }

  onSubmit(): void {
    const role = this.signUpForm.value.isAdmin ? "admin" : "customer";

    console.log("RegisterRequest", this.signUpForm.value);

    this.authService.register(this.signUpForm.value, role).subscribe(
      (response) => {
        console.log(response)
        this.snackBar.open("Account created successfully", "Close", {duration: 5000});
        this.router.navigateByUrl("/login");
      },
      (error) => {
        console.error(error)
        this.snackBar.open("Account creation failed. Please try again.", "Close", {duration: 5000, panelClass: 'error-snackbar'});
      }
    )
  }
}
