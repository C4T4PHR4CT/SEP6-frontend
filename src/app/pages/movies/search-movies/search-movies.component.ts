import { Genre } from './../../../shared/models/movie';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { FormBuilder, FormControl } from '@angular/forms';


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
  constructor(private moviesService: MoviesService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.moviesService.getMovieGenres().then((data) => {
      if (data) {
        //@ts-ignore
        this.movieGenres = data.genres;
        //@ts-ignore
        console.log(this.movieGenres[0].name);
      }
    });

  }

  public search():void{
  }
}
