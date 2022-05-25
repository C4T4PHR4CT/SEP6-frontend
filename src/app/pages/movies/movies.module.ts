import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieComponent } from './movie/movie.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './search/search.component';
import { DiscoverComponent } from './discover/discover.component';
import { MoviesComponent } from './movies.component';

@NgModule({
  declarations: [DiscoverComponent, MovieComponent, SearchComponent, MoviesComponent],
  imports: [SharedModule, MoviesRoutingModule, NgxPaginationModule],
  providers: [MoviesService],
})
export class MoviesModule {}
