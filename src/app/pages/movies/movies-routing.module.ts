import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'discover',
        component: DiscoverComponent,
      },
      {
        path: 'favourites',
        component: FavouritesComponent
      },
      {
        path: ':id',
        component: MovieComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
