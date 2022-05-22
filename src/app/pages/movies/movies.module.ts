import { NgModule } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieComponent } from './movie/movie.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { PopularComponent } from './popular/popular.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [SearchMoviesComponent, MovieComponent, PopularComponent],
  imports: [SharedModule, MoviesRoutingModule, NgxPaginationModule],
  providers: [MoviesService],
})
export class MoviesModule {}
