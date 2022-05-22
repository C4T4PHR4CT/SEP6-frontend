import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  public searchForm = this.formBuilder.group({
    search: new FormControl(''),
    year: new FormControl(''),
  });
  public items: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public movies: Movie[] | undefined;

  private subscription: Subscription = new Subscription();
  constructor(public router: Router, private moviesService: MoviesService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fetchPopularMovies();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public routeToMovie(movie: Movie): void {
    this.moviesService.setSelectedMovie(movie);
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }

  public search():void{
    if(this.searchForm.value.search !== "")
    {
      this.moviesService.searchForMovies(this.searchForm.value.search, this.searchForm.value.year).then((data) =>{
        if(data)
        {
          //@ts-ignore
          this.movies = data.results;
          console.log(data)
        }
      }
      );
    }
    else{
      this.fetchPopularMovies();
    }
  }

  public fetchPopularMovies(): void {
    this.moviesService.getPopularMovies().then((data) => {
      //@ts-ignore
      this.movies = data.results;
    });
  }


}
