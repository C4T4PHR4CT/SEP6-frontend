import { Genre, Movie } from './../../../shared/models/movie';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss'],
})
export class SearchMoviesComponent implements OnInit {
  public searchForm = this.formBuilder. group({
    search: new FormControl(''),
    genre: new FormControl(''),
  });
  public movieGenres: Genre[] = [];
  public moviesFound: Movie[] = [];
  constructor(private moviesService: MoviesService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.moviesService.getMovieGenres().then((data) => {
      if (data) {
        //@ts-ignore
        this.movieGenres = data.genres;
      }
    });

  }

  public search():void{
    if(this.searchForm.value.search !== "")
    {
      this.moviesService.searchForMovies(this.searchForm.value.search, []).then((data) =>{
        if(data)
        {
          //@ts-ignore
          this.moviesFound = data.results;
          console.log(data)
        }
      }
      );
    }
    else
    {

    }

  }

  public routeToMovie(movie: Movie): void {
    this.router.navigateByUrl(`/movies/${movie.id}`);
  }
}
