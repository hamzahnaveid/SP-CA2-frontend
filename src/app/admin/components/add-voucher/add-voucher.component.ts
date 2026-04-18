import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.scss']
})
export class AddVoucherComponent {

  voucherForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.voucherForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
    })
  }

  addVoucher() {
    if (this.voucherForm.valid) {
      this.adminService.addVoucher(this.voucherForm.value).subscribe(
        (response) => {
          if (response.id != null) {
            console.log(response)
            this.snackBar.open("Added Voucher Successfully!", "Close", {
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
      this.voucherForm.markAllAsTouched();
    }
  }

}
