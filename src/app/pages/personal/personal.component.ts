import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public user: {username: string, email: string} = JSON.parse(localStorage.getItem("user") ?? "{}");

  constructor(private authService: AuthService) {this.authService.confirmToken()}

  ngOnInit(): void {
  }

}
