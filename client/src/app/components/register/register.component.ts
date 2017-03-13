import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

// Import User Model
import { UserModel } from '../model/user';


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
  constructor(fb: FormBuilder) {
    //Model Driven Form
    this.form = fb.group({
      name: [, Validators.required],
      username: [, Validators.required],
      email: [, Validators.required],
      password: [, Validators.required]
    })
  }

  registerForm() {
    console.log(this.user);
  }
  ngOnInit() {

  }
}
