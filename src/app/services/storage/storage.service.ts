import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USER = 'user';
  private TOKEN = 'token';

  saveUser(user: any): void {
    sessionStorage.setItem(this.USER, JSON.stringify(user));
  }

  getUser(): any {
    const user = sessionStorage.getItem(this.USER);
    return user ? JSON.parse(user) : null;
  }

  saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN);
  }

  getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return ''
    }
    return user.role
  }

  isAdminLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }

  isCustomerLoggedIn(): boolean {
    if (this.getToken() == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "CUSTOMER";
  }

  signOut(): void {
    sessionStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
