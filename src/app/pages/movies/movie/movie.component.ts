import { MovieComment } from './../../../shared/models/movie';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genre, Movie, MovieSearchResult } from 'src/app/shared/models/movie';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  public selectedMovie: Movie | null = null;
  public genres: Genre[] = [];
  public similarMovies: Movie[] = [];
  public comments: MovieComment[] = [];
  public isFavourite: boolean = true;
  public commentForm: FormGroup = this.fb.group({
    comment: ['', []],
  });
  private user: any;
  private subscription: Subscription = new Subscription();

  constructor(
    public moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.user = localStorage.getItem('user');
    if (this.user) {
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

        this.moviesService.getComments(movieId).then((data: MovieComment[]) => {
          this.comments = data;
        });

        this.moviesService.getFavourites().then((data: Array<string>) => {
          this.isFavourite = data.includes(movieId);
        });

        this.commentForm.valueChanges.subscribe(_val => {this.commentForm.controls["comment"].setErrors(null);});
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
    if (this.selectedMovie) {
      if (this.isFavourite)
        this.moviesService.removeFavourite(this.selectedMovie);
      else
        this.moviesService.addFavourite(this.selectedMovie);
      this.isFavourite = !this.isFavourite;
    }
  }

  public onSubmit(): void {
    if ((this.commentForm.controls["comment"]?.value ?? "").trim() === "") {
      this.commentForm.controls["comment"].setErrors({'Required': true});
    } else if (this.selectedMovie && this.commentForm.valid && this.commentForm.value.commentForm !== '') {
      this.moviesService.postComment(
        this.commentForm.value.comment,
        this.selectedMovie.id
      );
      this.comments.push({
        username: this.user.username,
        content: this.commentForm.value.comment,
        date: new Date().getTime() / 1000,
      });
      this.commentForm.setValue({ comment: '' });
      this.commentForm.controls["comment"].setErrors(null);
    }
  }
}