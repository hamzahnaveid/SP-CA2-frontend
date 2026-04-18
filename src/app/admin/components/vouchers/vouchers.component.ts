import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent {

  vouchers: any;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getAllVouchers();
  }

  getAllVouchers() {
    this.adminService.getAllVouchers().subscribe(
      (response) => {
        this.vouchers = response;
      }
    )
  }

}
