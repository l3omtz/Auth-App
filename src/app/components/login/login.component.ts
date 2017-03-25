import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

import { AuthService } from '../../services/auth.service';


// Import User Model
import { UserModel } from '../model/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  // login model
  user = new UserModel();

  auth = true;

  constructor(fb: FormBuilder, private _auth: AuthService, private route: Router) {
    //Model Driven Form
    this.form = fb.group({
      username: [, Validators.required],
      password: [, Validators.required]
    })
  }

  login() {
    this._auth.authenticateUser(this.user).subscribe(data => {
      //console.log(data); // <- comment out so data wont show
      if (data.success) { // <- data is what is being recieved from db when auth is met - success = true
        this.auth = true; // <- Bootstrap alert msg
        this._auth.storeUSerData(data.token, data.user) // <- funciton from services taken token and the user
        this.route.navigate(['/dashboard']);
      } else {
        this.auth = false; // <- IF it was a bad auht then send error msg to user 
      }
    });
  }

  ngOnInit() {

  }

}
