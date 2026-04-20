import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {
  productId = this.activatedRoute.snapshot.params['productId'];

  productForm!: FormGroup;
  categoryList: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  existingImage: string | null = null;
  imageChanged = false

  
  constructor(
      private fb: FormBuilder,
      private router: Router,
      private snackBar: MatSnackBar,
      private adminService: AdminService,
      private activatedRoute: ActivatedRoute
    ) {}
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
      this.existingImage = null;
      this.imageChanged = true;
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
          stock: [null, [Validators.required]],
          description: [null, [Validators.required]],
        });
  
        this.getAllCategories();
        this.getProductbyId();
      }
  
      getAllCategories(){
        this.adminService.getAllCategories().subscribe(
          (response) => {
            this.categoryList = response;
          }
        )
      }

      getProductbyId() {
        this.adminService.getProductById(this.productId).subscribe(
          (response) => {
            console.log(response);
            response.categoryId = response.category.id;
            this.productForm.patchValue(response);
            this.existingImage = 'data:image/jpeg;base64,' + response.image;
          }
        )
      }
  
      updateProduct(): void {
        if (this.productForm.valid) {
          const formData: FormData = new FormData();

          if (this.imageChanged && this.selectedFile) {
            formData.append('image', this.selectedFile);
          }
          else {
            const file = this.base64ToFile(this.existingImage, 'existing.jpg');
            formData.append('image', file);
          }
          formData.append('categoryId', this.productForm.get('categoryId').value);          
          formData.append('name', this.productForm.get('name').value);
          formData.append('manufacturer', this.productForm.get('manufacturer').value);
          formData.append('price', this.productForm.get('price').value);
          formData.append('stock', this.productForm.get('stock').value);
          formData.append('description', this.productForm.get('description').value);
  
          this.adminService.updateProduct(this.productId, formData).subscribe(
            (response) => {
              console.log(response)
              this.snackBar.open("Updated product successfully!", "Close", {
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

      base64ToFile(base64: string, filename: string): File {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
      
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
      
        return new File([u8arr], filename, { type: mime });
      }

}
