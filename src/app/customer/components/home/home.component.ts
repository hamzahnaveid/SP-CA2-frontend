import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: any[] = [];
  searchProductForm!: FormGroup;
  sortProductForm!: FormGroup;
  
  sortBy: string = 'name';
  type: string = 'desc';
  
  constructor( 
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}
  
  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      term: ['']
    })
  }
  
  getAllProducts(){
    this.products = [];
    this.customerService.getAllProducts().subscribe(
      (response) => {
        console.log(response)
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.image;
          this.products.push(element);
        })
      },
      (error) => {
        this.snackBar.open(error.message, "Close", {
              duration: 5000,
              panelClass: 'error-snackbar'
            });
      }
    );
  }

  search() {
    this.products = [];
    const term = this.searchProductForm.get('term')!.value;
  
    this.customerService.getAllProductsByTermAndSort(term, this.sortBy, this.type).subscribe(
      (response) => {
        console.log(term)
        console.log(response)
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.image;
          this.products.push(element);
        })
      }
    );
  }
  
  sort(type: string) {
    this.type = type;
    this.search();
  }

  addToCart(productId:any) {

  }
}
