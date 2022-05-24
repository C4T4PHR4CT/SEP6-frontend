import {
  Genre,
  Movie,
  MovieSearchResult,
  SortOptions,
  SORT_BY_OPTIONS,
} from '../../../shared/models/movie';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  public searchForm = this.formBuilder.group({
    sortBy: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    year: new FormControl(''),
  });
  public movieGenres: Genre[] = [];
  public moviesFound: Movie[] = [];
  public sortOptions = SORT_BY_OPTIONS;
  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.moviesService.getMovieGenres().then((data) => {
      if (data) {
        //@ts-ignore
        this.movieGenres = data.genres;
      }
    });
    this.moviesService.getPopularMovies(1).then((data: MovieSearchResult) => {
      if (data) {
        this.moviesFound = data.results;
      }
    });
  }

  public search(): void {
    this.moviesService
      .discoverMovies(
        this.searchForm.value.sortBy,
        this.searchForm.value.genre,
        this.searchForm.value.year
      )
      .then((data: MovieSearchResult) => {
        if (data) {
          this.moviesFound = data.results;
        }
      });
  }

  public routeToMovie(movie: Movie): void {
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }
}
