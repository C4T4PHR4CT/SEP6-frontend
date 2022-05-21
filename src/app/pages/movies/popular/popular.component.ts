import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit, OnDestroy {
  public items: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public movies: Movie[] = [];

  private subscription: Subscription = new Subscription();
  constructor(public router: Router, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.moviesService.popularMovies$.subscribe((data) => {
        if (data) {
          //@ts-ignore
          this.movies = data.results;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public routeToMovie(movie: Movie): void {
    this.moviesService.setSelectedMovie(movie);
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }
}
