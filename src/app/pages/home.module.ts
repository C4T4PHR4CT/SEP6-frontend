import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PersonalComponent } from './personal/personal.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';

@NgModule({
  declarations: [HomeComponent, TopToolbarComponent, PersonalComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
