import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe(
        (response) => {
          if (response.id != null) {
            console.log(response)
            this.snackBar.open("Added Category Successfully!", "Close", {
              duration: 5000
            })
            this.router.navigateByUrl('/admin/dashboard')
          }

          else {
            this.snackBar.open(response.message, "Close", {
              duration: 5000,
              panelClass: 'error-snackbar'
            });
          }
        }
      )
    }
    else {
      this.categoryForm.markAllAsTouched();
    }
  }

}
