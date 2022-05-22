import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieComponent } from "./movie/movie.component";
import { MoviesComponent } from "./movies.component";
import { PopularComponent } from "./popular/popular.component";
import { SearchMoviesComponent } from "./search-movies/search-movies.component";

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: 'search',
        component: PopularComponent
      },
      {
        path: 'discover',
        component: SearchMoviesComponent,
      },
      {
        path: ':id',
        component: MovieComponent
      },
      { path: '**', redirectTo: 'popular' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
