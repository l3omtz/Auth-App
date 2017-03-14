import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

// Import User Model
import { UserModel } from '../model/user';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  titleUser: string;
  form: FormGroup;

  // User model
  user = new UserModel();

  //Make private so wont effect other routs - Create instance of FormBuilder
  constructor(fb: FormBuilder, private _auth: AuthService, private route: Router) {
    //Model Driven Form
    this.form = fb.group({
      name: [, Validators.required],
      username: [, Validators.required],
      email: [, Validators.required],
      password: [, Validators.required]
    })
  }

  registerForm() {
    // Register user
    this._auth.registerUser(this.user).subscribe(data => {
      if (data.success) {
        console.log("created a user");
        this.route.navigate(['/login']);
      } else {
        console.log("nope err err err");
        this.route.navigate(['/home']);
      }
    });
  }
  ngOnInit() {

  }
}
