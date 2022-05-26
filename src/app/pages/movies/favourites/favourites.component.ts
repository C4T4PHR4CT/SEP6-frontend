import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  public movies: any;
  public page = 1;
  public total = 0;

  constructor(private router: Router, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getFavourites().then((data) => {
      data.forEach((element: number) => {
        this.moviesService.getMovie(element).then((movie) => {
          this.movies.push(movie);
        })
      });
  });
}


  public routeToMovie(movie: Movie): void {
    this.router.navigateByUrl(`home/movies/${movie.id}`);
  }
}
