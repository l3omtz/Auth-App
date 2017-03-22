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

  constructor(fb: FormBuilder, private _auth: AuthService, private route: Router) {
    //Model Driven Form
    this.form = fb.group({
      username: [, Validators.required],
      password: [, Validators.required]
    })
  }

  login() {
    this._auth.authenticateUser(this.user).subscribe(data => {
      console.log(data); // <- comment our so data wont show
      if (!data.success) {
        console.log("nope");
      }

    });
  }

  ngOnInit() {

  }

}
