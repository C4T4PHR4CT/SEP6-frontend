import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, ReplaySubject } from 'rxjs';
import { Genre, Movie, MovieSearchResult } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public movie$: ReplaySubject<Movie> = new ReplaySubject<Movie>();
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
        `https://sep.nlevi.dev/themoviedb/movie/${movieId}`
      )
    );
    return response;
  }

  public async getMovieRecommendations(movieId: number): Promise<MovieSearchResult> {
    let params = new HttpParams();
    params = params.append('page', '1');
    const response = await lastValueFrom(
      this.http.get<MovieSearchResult>(
        `https://sep.nlevi.dev/themoviedb/movie/${movieId}/similar`, { params }
      )
    );
    return response;
  }

  public async getPopularMovies(page: number): Promise<MovieSearchResult> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    const response = await lastValueFrom(
      this.http.get<MovieSearchResult>(
        'https://sep.nlevi.dev/themoviedb/movie/popular', { params }
      )
    );
    return response;
  }

  public async getMovieGenres(): Promise<Genre[]> {
    let params = new HttpParams();

    const response = await lastValueFrom(
      this.http.get<Genre[]>(
        `https://sep.nlevi.dev/themoviedb/genre/movie/list`, { params }
      )
    );
    return response;
  }

  public async searchForMovies(
    movieName: string,
    year?: number,
    page?: number
  ): Promise<MovieSearchResult> {
    let params = new HttpParams();
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
      this.http.get<MovieSearchResult>(`https://sep.nlevi.dev/themoviedb/search/movie`, {
        params,
      })
    );
    // } else {
    //   response = await lastValueFrom(
    //     this.http.get<Movie[]>(
    //       `https://sep.nlevi.dev/themoviedb/discover/movie?include_adult=false&include_video=false&page=1&with_genres=${genres.toString()}`
    //     )
    //   );
    // }
    return response;
  }

  public async discoverMovies(sortBy: string, genres:Genre[] | string[], year?: number, page?: number): Promise<MovieSearchResult>{
    let params = new HttpParams();
    params = params.append('sort_by', sortBy);
    if (genres.length > 0) {
      params = params.append('with_genres', genres.toString());
    }
    if (year) {
      params = params.append('year', year.toString());
    }
    if(page)
    {
      params = params.append('page', page.toString());
    }
    const response = await lastValueFrom(
      this.http.get<MovieSearchResult>(
        `https://sep.nlevi.dev/themoviedb/discover/movie`, { params }
      )
    );
    return response;
  }
}