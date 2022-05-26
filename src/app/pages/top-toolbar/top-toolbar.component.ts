import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {
  public user: User = {username: '', email: ''};
  constructor(public authService: AuthService) {
    this.authService.user?.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
  }

}
