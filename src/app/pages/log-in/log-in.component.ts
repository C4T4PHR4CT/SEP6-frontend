import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    if(this.authService.isLoggedIn)
    {
      this.router.navigateByUrl('/home')
    }
    this.signinForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }
  ngOnInit() {}

  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}
