import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  productForm!: FormGroup;
  categoryList: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private snackBar: MatSnackBar,
      private adminService: AdminService
    ) {}

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
      this.previewImage();
    }

    previewImage(){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
          categoryId: [null, [Validators.required]],
          name: [null, [Validators.required]],
          manufacturer: [null, [Validators.required]],
          price: [null, [Validators.required]],
          stockQuantity: [null, [Validators.required]],
          description: [null, [Validators.required]],
        });

        this.getAllCategories();
      }

      getAllCategories(){
        this.adminService.getAllCategories().subscribe(
          (response) => {
            this.categoryList = response;
          }
        )
      }

      addProduct(): void {
        if (this.productForm.valid) {
          const formData: FormData = new FormData();
          formData.append('image', this.selectedFile);
          formData.append('categoryId', this.productForm.get('categoryId').value);          
          formData.append('name', this.productForm.get('name').value);
          formData.append('manufacturer', this.productForm.get('manufacturer').value);
          formData.append('price', this.productForm.get('price').value);
          formData.append('stock', this.productForm.get('stockQuantity').value);
          formData.append('description', this.productForm.get('description').value);

          this.adminService.addProduct(formData).subscribe(
            (response) => {
              console.log(response)
              this.snackBar.open("Added Category Successfully!", "Close", {
              duration: 5000
              })
              this.router.navigateByUrl('/admin/dashboard')
            },
            (error) => {
              this.snackBar.open(error.message, "Close", {
              duration: 5000,
              panelClass: 'error-snackbar'
            });
            }
          )
        }
      }

}
