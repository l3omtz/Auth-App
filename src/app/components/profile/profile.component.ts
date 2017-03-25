import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
    this._auth.getProfile().subscribe(data => {
      this.user = data.user;
    },
      err => {
        return false;
      });
  }

}
