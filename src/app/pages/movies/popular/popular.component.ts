import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit, OnDestroy {
  public searchForm = this.formBuilder.group({
    search: new FormControl(''),
    year: new FormControl(''),
  });
  public movies: any;
  public page: number = 1;
  public total: number = 0;
  private subscription: Subscription = new Subscription();
  constructor(
    public router: Router,
    private moviesService: MoviesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchPopularMovies(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public routeToMovie(movie: Movie): void {
    this.moviesService.setSelectedMovie(movie);
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }

  public search(): void {
    if (this.searchForm.value.search !== '') {
      this.moviesService
        .searchForMovies(
          this.searchForm.value.search,
          this.searchForm.value.year
        )
        .then((data) => {
          if (data) {
            //@ts-ignore
            this.movies = data.results;
            //@ts-ignore
            this.total = data.total_results;
            //api doesn't support more than 500 pages
            if (this.total > 500) {
              this.total = 500;
            }
          }
        });
    } else {
      this.fetchPopularMovies(1);
    }
  }

  public fetchPopularMovies(page: number): void {
    this.moviesService.getPopularMovies(page).then((data) => {
      //@ts-ignore
      this.movies = data.results;
      //@ts-ignore
      this.total = data.total_results;
      //api doesn't support more than 500 pages (500 pages * 20 items per page = 10000) so we set it to 10000
      if (this.total > 10000) {
        this.total = 10000;
      }
    });
  }

  public handlePageChange(event: any): void {
    this.page = event;
    if(this.searchForm.value.search !== '') {
    this.moviesService
        .searchForMovies(
          this.searchForm.value.search,
          this.searchForm.value.year,
          this.page
        )
        .then((data) => {
          if (data) {
            //@ts-ignore
            this.movies = data.results;
            //@ts-ignore
            this.total = data.total_results;
            //api doesn't support more than 500 pages
            if (this.total > 10000) {
              this.total = 10000;
            }
          }
        });

  }
  else {
    this.fetchPopularMovies(this.page);
  }

}
}
