import { Component } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sp-ca2-frontend';

  constructor(private storage: StorageService, private router: Router) {}
  
  isAdminLoggedIn: boolean = this.storage.isAdminLoggedIn();
  isCustomerLoggedIn: boolean = this.storage.isCustomerLoggedIn();

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isAdminLoggedIn = this.storage.isAdminLoggedIn();
      this.isCustomerLoggedIn = this.storage.isCustomerLoggedIn();
    })
  }

  logout() {
    this.storage.signOut();
    this.router.navigateByUrl('/login');
  }
}
