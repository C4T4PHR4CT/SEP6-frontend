import { Genre, Movie, SortOptions, SORT_BY_OPTIONS } from './../../../shared/models/movie';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss'],
})
export class SearchMoviesComponent implements OnInit {
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
    this.moviesService.getPopularMovies().then((data) => {
      if (data) {
        //@ts-ignore
        this.moviesFound = data.results;
      }
    }
    );
  }

  public search(): void {
    this.moviesService.discoverMovies(this.searchForm.value.sortBy, this.searchForm.value.genre, this.searchForm.value.year).then((data) => {
      if (data) {
        //@ts-ignore
        this.moviesFound = data.results;
      }
    }
    );
  }

  public routeToMovie(movie: Movie): void {
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }
}
