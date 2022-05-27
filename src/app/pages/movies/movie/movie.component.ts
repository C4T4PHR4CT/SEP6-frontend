import { MovieComment } from './../../../shared/models/movie';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Genre, Movie, MovieSearchResult } from 'src/app/shared/models/movie';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  public selectedMovie: Movie | null = null;
  public genres: Genre[] = [];
  public similarMovies: Movie[] = [];
  public comments: MovieComment[] = [{username: 'bob', content: 'movie sucks', date: 1619110385}, {username: 'bob', content: 'movie is fucking garbage!', date: 1619110385}];
  public commentForm: FormGroup = this.fb.group({
    comment: ['', [Validators.required]]
  });
  private user: any;
  private subscription: Subscription = new Subscription();

  constructor(
    public moviesService: MoviesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.user = localStorage.getItem('user');
    if(this.user)
    {
      this.user = JSON.parse(this.user);
    }
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

        this.moviesService
          .getMovieRecommendations(movieId)
          .then((data: MovieSearchResult) => {
            for (let i = 0; i < data.results.length; i++) {
              if (this.similarMovies.length <= 4) {
                this.similarMovies.push(data.results[i]);
              } else {
                break;
              }
            }
          });
      })
    );
  }

  public checkIfAny(companies: any): boolean {
    if (companies.length > 0) {
      return true;
    }
    return false;
  }

  public routeToMovie(movie: Movie): void {
    this.router.navigateByUrl(`home/movies/${movie.id}`);
  }

  public addFav(): void {
    if(this.selectedMovie) {
    this.moviesService.addFavourite(this.selectedMovie);
    }
  }

  public onSubmit(): void
  {
    if(this.selectedMovie)
    {
    this.moviesService.postComment(this.commentForm.value.comment, this.selectedMovie.id);
    this.comments.push({username: this.user.username, content: this.commentForm.value.comment, date: new Date().getTime()/1000});
    }
  }
}
