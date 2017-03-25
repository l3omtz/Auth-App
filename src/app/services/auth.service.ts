import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';  // <- Map operator from rxjs


@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private _http: Http) { }
  // Get all users from API
  getAllPosts() {
    return this._http.get('/api/users')
      .map(res => res.json());
  }
  // Register Use from API
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/adduser', user, { headers: headers })
      .map(res => res.json());
  }
  // Login user from API
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/api/profile', { headers: headers })
      .map(res => res.json());
  }

  // Store user data in localStorage
  storeUSerData(token, user) {
    localStorage.setItem('id_token', token); // Setting key/ value from params
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token; // <- pass token to var
    this.user = user; // <- pass user to var
  }

  // Clear Token on Logout
  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear(); // <- clears local storage
  }

  // Is logged in protect routes
  loggedIn() {
    return tokenNotExpired();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
