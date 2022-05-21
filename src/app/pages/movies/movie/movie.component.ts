import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Genre, Movie } from 'src/app/shared/models/movie';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  public selectedMovie: Movie | null = null;
  public genres: Genre[] = [];
  public similarMovies: Movie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    public moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(async (params) => {
        const movieId = params['id'];

        this.moviesService.getMovie(movieId).then((data) => {
          if (data) {
            this.selectedMovie = data;
            this.genres = this.selectedMovie.genres;
          }
        });

        this.moviesService.getMovieRecommendations(movieId).then((data) => {
          //@ts-ignore
          for (let i = 0; i < data.results.length; i++) {
            if (this.similarMovies.length <= 4) {
              //@ts-ignore
              this.similarMovies.push(data.results[i]);
            } else {
              break;
            }
          }
        });
      })
    );
  }

  public checkIfAny(companies: any): boolean
  {
    if(companies.length > 0)
    {
      return true;
    }
    return false;
  }

  public routeToMovie(movie: Movie): void {
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }
}
