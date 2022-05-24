import {
  DiscoveryQueryParameters,
  Genre,
  Movie,
  MovieSearchResult,
  SearchQueryParameters,
  SortOptions,
  SORT_BY_OPTIONS,
} from '../../../shared/models/movie';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  public searchForm = this.formBuilder.group({
    sortBy: new FormControl(''),
    genre: new FormControl('', [Validators.required]),
    year: new FormControl(''),
  });
  public movieGenres: Genre[] = [];
  public movies: any;
  public sortOptions = SORT_BY_OPTIONS;
  public page: number = 1;
  public total: number = 0;
  private sortByParam: string = '';
  private genreParam: string[] = [];
  private yearParam: number | undefined;

  private subscription: Subscription = new Subscription();
  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        if (!params['with_genres']) {
          this.searchForm.patchValue({ sortBy: '', genre: '', year: '' });

          if (params['page']) {
            console.log(params['page']);
            this.page = params['page'];
            this.fetchPopularMovies(params['page']);
          } else {
            this.fetchPopularMovies(1);
          }
        } else {
          //parse string to number array
          this.genreParam = params['with_genres'].split(',').map((num: any) => {
            let n = Number(num);
            return n === 0 ? n : n || num;
          });
          this.searchForm.patchValue({ genre: this.genreParam });
          if (params['year']) {
            this.yearParam = params['year'];
            this.searchForm.patchValue({ year: this.yearParam });
          }
          if (params['sortBy']) {
            this.sortByParam = params['sortBy'];
            this.searchForm.patchValue({ sortBy: this.sortByParam });
          }
          if (params['page']) {
            this.page = params['page'];
          }
          this.moviesService
            .discoverMovies(
              this.sortByParam,
              this.genreParam,
              this.yearParam,
              this.page
            )
            .then((data: MovieSearchResult) => {
              if (data) {
                this.setResultsFromData(data);
              }
            });
        }
      })
    );
    this.moviesService.getMovieGenres().then((data) => {
      if (data) {
        //@ts-ignore
        this.movieGenres = data.genres;
      }
    });
  }

  public search(): void {
    let queryParams: DiscoveryQueryParameters = { page: this.page };
    if (this.searchForm.value.genre.length === 0) {
      this.router.navigate([]);
      this.fetchPopularMovies(1);
    } else {
      console.log(this.searchForm.value.genre);
      queryParams.with_genres = this.searchForm.value.genre.toString();
      if (this.searchForm.value.year !== '') {
        queryParams.year = this.searchForm.value.year;
      }
      if (this.searchForm.value.sortBy !== '') {
        queryParams.sortBy = this.searchForm.value.sortBy;
      }
      this.router.navigate([], { relativeTo: this.route, queryParams });
      this.moviesService
        .discoverMovies(
          this.searchForm.value.sortBy,
          this.searchForm.value.genre,
          this.searchForm.value.year
        )
        .then((data) => {
          this.setResultsFromData(data);
        });
    }
  }

  public routeToMovie(movie: Movie): void {
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }

  public fetchPopularMovies(page: number): void {
    this.moviesService
      .getPopularMovies(page)
      .then((data: MovieSearchResult) => {
        this.setResultsFromData(data);
      });
  }

  private setResultsFromData(data: MovieSearchResult) {
    this.movies = data.results;
    this.total = data.total_results;
    this.page = data.page;
    //api doesn't support more than 500 pages
    if (this.total > 10000) {
      this.total = 10000;
    }
  }

  public handlePageChange(event: any): void {
    let queryParams: DiscoveryQueryParameters = { page: event };
    const routeGenreString = this.route.snapshot.queryParams['with_genres'];
    if (routeGenreString) {
      queryParams.with_genres = routeGenreString;
      if (this.route.snapshot.queryParams['year']) {
        queryParams.year = this.route.snapshot.queryParams['year'];
      }
      if (this.route.snapshot.queryParams['sortBy']) {
        queryParams.sortBy = this.route.snapshot.queryParams['sortBy'];
      }
      this.moviesService
        .discoverMovies(
          this.sortByParam,
          this.genreParam,
          this.yearParam,
          event
        )
        .then((data) => {
          this.setResultsFromData(data);
          this.router.navigate([], { relativeTo: this.route, queryParams });
        });
    } else {
      this.router.navigate([], { relativeTo: this.route, queryParams });
      this.fetchPopularMovies(event);
    }
  }
}
