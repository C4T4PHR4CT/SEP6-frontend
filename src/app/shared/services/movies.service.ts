import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  lastValueFrom,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { HttpsResponse } from '../models/http.model';
import { Genre, Movie, MovieSearchResult, SortOptions } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public movie$: ReplaySubject<Movie> = new ReplaySubject<Movie>();
  public apiKey: string = '0859f3a7791c504d30a087517505495c';
  public language: string = 'en-US';
  constructor(private http: HttpClient) {}

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

  public async getMovieRecommendations(movieId: number): Promise<MovieSearchResult> {
    let params = this.appendBasics();
    params = params.append('page', '1');
    const response = await lastValueFrom(
      this.http.get<MovieSearchResult>(
        `https://api.themoviedb.org/3/movie/${movieId}/similar`, { params }
      )
    );
    return response;
  }

  public async getPopularMovies(page: number): Promise<MovieSearchResult> {
    let params = this.appendBasics();
    params = params.append('page', page.toString());
    const response = await lastValueFrom(
      this.http.get<MovieSearchResult>(
        'https://api.themoviedb.org/3/movie/popular', { params }
      )
    );
    return response;
  }

  public async getMovieGenres(): Promise<Genre[]> {
    let params = this.appendBasics();

    const response = await lastValueFrom(
      this.http.get<Genre[]>(
        `https://api.themoviedb.org/3/genre/movie/list`, { params }
      )
    );
    return response;
  }

  public async searchForMovies(
    movieName: string,
    year?: number,
    page?: number
  ): Promise<MovieSearchResult> {
    let params = this.appendBasics();
    if (movieName) {
      params = params.append('query', movieName);
    }
    if (year) {
      params = params.append('year', year.toString());
    }
    if (page) {
      params = params.append('page', page.toString());
    }
    const response = await lastValueFrom(
      this.http.get<MovieSearchResult>(`https://api.themoviedb.org/3/search/movie`, {
        params,
      })
    );
    // } else {
    //   response = await lastValueFrom(
    //     this.http.get<Movie[]>(
    //       `https://api.themoviedb.org/3/discover/movie?api_key=0859f3a7791c504d30a087517505495c&language=en-US&include_adult=false&include_video=false&page=1&with_genres=${genres.toString()}`
    //     )
    //   );
    // }
    return response;
  }

  public async discoverMovies(sortBy: string, genres:Genre[], year?: number): Promise<MovieSearchResult>{
    console.log(sortBy);
    let params = this.appendBasics();
    params = params.append('sort_by', sortBy);
    if (genres.length > 0) {
      params = params.append('with_genres', genres.toString());
    }
    if (year) {
      params = params.append('year', year.toString());
    }
    const response = await lastValueFrom(
      this.http.get<MovieSearchResult>(
        `https://api.themoviedb.org/3/discover/movie`, { params }
      )
    );
    return response;
  }

  public appendBasics(): HttpParams
  {
    let params = new HttpParams();
    params = params.append('api_key', this.apiKey);
    params = params.append('language', this.language);

    return params;
  }
}
