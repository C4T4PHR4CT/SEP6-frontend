import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { TopToolbarComponent } from "./top-toolbar/top-toolbar.component";
import { MoviesComponent } from './movies/movies.component';
import { PersonalComponent } from './personal/personal.component';
import { MovieComponent } from "./movies/movie/movie.component";

@NgModule({
  declarations: [
    HomeComponent,
    TopToolbarComponent,
    MoviesComponent,
    PersonalComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule {}
