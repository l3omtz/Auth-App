import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';  // <- Map operator from rxjs


@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private _http: Http) { }
  // Get all users from API
  getAllPosts() {
    return this._http.get('/api/getall')
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
}
