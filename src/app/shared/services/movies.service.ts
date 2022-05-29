import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Genre, Movie, MovieComment, MovieSearchResult } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  public async getMovie(movieId: number): Promise<Movie> {
    return await lastValueFrom(
      this.http.get<Movie>(`https://sep.nlevi.dev/themoviedb/movie/${movieId}`)
    );
  }

  public async getMovieRecommendations(
    movieId: number
  ): Promise<MovieSearchResult> {
    let params = new HttpParams();
    params = params.append('page', '1');
    return lastValueFrom(
      this.http.get<MovieSearchResult>(
        `https://sep.nlevi.dev/themoviedb/movie/${movieId}/similar`,
        { params }
      )
    );
  }

  public async getPopularMovies(page: number): Promise<MovieSearchResult> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    return await lastValueFrom(
      this.http.get<MovieSearchResult>(
        'https://sep.nlevi.dev/themoviedb/movie/popular',
        { params }
      )
    );
  }

  public async getMovieGenres(): Promise<Genre[]> {
    let params = new HttpParams();

    return await lastValueFrom(
      this.http.get<Genre[]>(
        `https://sep.nlevi.dev/themoviedb/genre/movie/list`,
        { params }
      )
    );
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
    return await lastValueFrom(
      this.http.get<MovieSearchResult>(
        `https://sep.nlevi.dev/themoviedb/search/movie`,
        {
          params,
        }
      )
    );
  }

  public async discoverMovies(
    sortBy: string,
    genres: Genre[] | string[],
    year?: number,
    page?: number
  ): Promise<MovieSearchResult> {
    let params = new HttpParams();
    params = params.append('sort_by', sortBy);
    if (genres.length > 0) {
      params = params.append('with_genres', genres.toString());
    }
    if (year) {
      params = params.append('year', year.toString());
    }
    if (page) {
      params = params.append('page', page.toString());
    }
    return await lastValueFrom(
      this.http.get<MovieSearchResult>(
        `https://sep.nlevi.dev/themoviedb/discover/movie`,
        { params }
      )
    );
  }

  public addFavourite(movie: Movie): void {
    if (movie) {
      this.http.post(`https://sep.nlevi.dev/api/favourite/${movie.id}`, {});
    }
  }

  public removeFavourite(movie: Movie): void {
    if (movie) {
      this.http.delete(`https://sep.nlevi.dev/api/favourite/${movie.id}`, {});
    }
  }

  public getFavourites() {
    return lastValueFrom(
      this.http.get<any>(`https://sep.nlevi.dev/api/favourite`)
    );
  }

  public getCredits(movieId: number) {
    return lastValueFrom(
      this.http.get<any>(
        `https://sep.nlevi.dev/themoviedb/movie/${movieId}/credits`
      )
    );
  }

  public postComment(comment: string, movieId: number) {
    console.log("post 2");
    if (comment) {
      console.log("post 3");
      this.http.post(`https://sep.nlevi.dev/api/comment/${movieId}`, {
        content: comment,
      });
    }
  }

  public getComments(movieId: number): Promise<MovieComment[]> {
    return lastValueFrom(
      this.http.get<MovieComment[]>(
        `https://sep.nlevi.dev/api/comment/${movieId}`
      )
    );
  }
}
