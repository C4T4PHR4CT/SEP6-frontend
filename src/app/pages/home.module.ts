import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PersonalComponent } from './personal/personal.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [HomeComponent, TopToolbarComponent, PersonalComponent, LogInComponent, SignUpComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
