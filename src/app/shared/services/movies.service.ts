import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { HttpsResponse } from '../models/http.model';
import { Genre, Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public movie$: ReplaySubject<Movie> = new ReplaySubject<Movie>();
  public popularMovies$: BehaviorSubject<Movie[]> = new BehaviorSubject<
    Movie[]
  >([]);

  private popularMoviesUrl: string =
    'https://api.themoviedb.org/3/movie/popular?api_key=0859f3a7791c504d30a087517505495c&language=en-US&page=1';

  constructor(private http: HttpClient) {
    this.init();
  }

  private init(): void {
    this.http
      .get<Movie[]>(this.popularMoviesUrl)
      .subscribe((res) => this.popularMovies$.next(res));
  }

  public setSelectedMovie(movie: Movie): void {
    this.movie$.next(movie);
  }

  public deselectSelectedMovie(): void {
    //@ts-ignore
    this.movie$.next(null);
  }

  public async getMovie(movieId: number): Promise<Movie> {
    const response = await lastValueFrom(
      this.http.get<Movie>(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=0859f3a7791c504d30a087517505495c`
      )
    );
    return response;
  }

  public async getMovieRecommendations(movieId: number): Promise<Movie[]> {
    const response = await lastValueFrom(
      this.http.get<Movie[]>(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=0859f3a7791c504d30a087517505495c&language=en-US&page=1`
      )
    );
    return response;
  }

  public async getMovieGenres(): Promise<Genre[]> {
    const response = await lastValueFrom(
      this.http.get<Genre[]>(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=0859f3a7791c504d30a087517505495c&language=en-US`
      )
    );
    return response;
  }

  public async searchForMovies(movieName: string | null, genres: Genre[])
  {
    let response;
    if(movieName)
    {
      response = await lastValueFrom(
        this.http.get<Movie[]>(`https://api.themoviedb.org/3/search/movie?api_key=0859f3a7791c504d30a087517505495c&language=en-US&query=${movieName}&page=1&include_adult=false`)
      );
      return response;
    }
    else
    {

    }
  }
}
