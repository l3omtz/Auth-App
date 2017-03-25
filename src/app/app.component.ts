import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _auth: AuthService) { }

  onLogout() {
    console.log('peace!');
    this._auth.logoutUser();
  }

}
