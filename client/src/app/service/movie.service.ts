import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { BehaviorSubject, Observable, catchError, tap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = '/api/movies/';
  movie$ = new BehaviorSubject<Movie[]>([]);

  getMovies(query: any = {}): Observable<Movie[]> {
    this.httpClient.get<Movie[]>(this.apiUrl, { params: query }).subscribe(
      (movies) => {
        this.movie$.next(movies);
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );

    // Return the BehaviorSubject as an Observable
    return this.movie$.asObservable();
  }

  getMovieImage(imageFilename: string) {
    return this.httpClient.get(this.apiUrl + 'image/' + imageFilename);
  }

  addMovies(formData: FormData, movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(this.apiUrl + 'post', formData).pipe(
      tap((movie: Movie) => {
        // Update the BehaviorSubject with the new movie
        const currentValue = this.movie$.getValue();
        this.movie$.next([...currentValue, movie]);
      }),
      catchError((error) => {
        return of({} as Movie);
      })
    );
  }

  editMovies(movie: any, movieId: string | undefined): Observable<Movie> {
    return this.httpClient
      .put<Movie>(this.apiUrl + 'update/' + movieId, movie)
      .pipe(
        tap((updatedMovie) => {
          // Update the movie$ BehaviorSubject with the updated data
          const currentMovies = this.movie$.value;
          const updatedMovies = currentMovies.map((m) =>
            m._id === movieId ? updatedMovie : m
          );
          this.movie$.next(updatedMovies);
        })
      );
  }
}
