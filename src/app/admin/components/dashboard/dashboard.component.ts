import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];

  constructor( 
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.products = [];
    this.adminService.getAllProducts().subscribe(
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

  

}
