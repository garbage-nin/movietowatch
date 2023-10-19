import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie = {} as Movie;
  @Output() afterEditEvent = new EventEmitter<any>();

  stars = [1, 2, 3, 4, 5];
  movieForm: FormGroup = {} as FormGroup;
  genreList = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery'];
  confirmationMessage = false;
  selectedRating = 0;
  dataChanges: any = [];
  formEditData: any = {};
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.selectedRating = this.movie.rating || 0;

    this.movieForm = new FormGroup({
      title: new FormControl({ value: this.movie.title, disabled: false }),
      actors: new FormControl({ value: this.movie.actors, disabled: true }),
      genre: new FormControl({ value: this.movie.genre, disabled: true }),
      rating: new FormControl({ value: this.movie.rating, disabled: true }),
      views: new FormControl({ value: this.movie.views, disabled: true }),
      pinned: new FormControl(this.movie.pinned),
      watched: new FormControl(this.movie.watched),
      watchedDate: new FormControl(),
      releaseDate: new FormControl({
        value: new Date(this.movie.releaseDate),
        disabled: true,
      }),
      imageFile: new FormControl(null),
    });
  }

  getMovieImageUrl(imageFilename: string | undefined | null) {
    if (!imageFilename) {
      return '';
    }

    return location.origin + '/api/movies/image/' + imageFilename;
  }

  enableInputField(formName: string): void {
    this.movieForm.controls[formName].enable();
  }

  disableInputField(formName: string): void {
    this.movieForm.controls[formName].disable();
  }

  editMovie(): void {
    this.movieService
      .editMovies(this.formEditData, this.movie._id)
      .subscribe((movie) => {
        if (movie) {
          this.confirmationMessage = false;
          this.afterEditEvent.emit({
            message: 'Edit successfully',
            action: 'Close',
          });
        }
      });
  }

  clickWatchIcon(): void {
    if (this.movieForm.get('watched')?.value) {
      return;
    }

    let movieData = {
      watched: true,
      watchedDate: new Date(),
    };

    this.movieService
      .editMovies(movieData, this.movie._id)
      .subscribe((movie) => {
        if (movie) {
          this.confirmationMessage = false;
          this.afterEditEvent.emit({
            message: 'Set to "already watched"',
            action: 'Close',
          });
        }
      });
  }

  clickPinnedIcon(): void {
    let movieData = {
      pinned: !this.movieForm.get('pinned')?.value,
    };

    let message = movieData.pinned
      ? 'Pinned successfully'
      : 'Unpinned successfully';

    this.movieService
      .editMovies(movieData, this.movie._id)
      .subscribe((movie) => {
        if (movie) {
          this.confirmationMessage = false;
          this.afterEditEvent.emit({
            message: message,
            action: 'Close',
          });
        }
      });
  }

  confirmMessageDisplay(): void {
    // title, views, rating, actor, releaseDate, genre
    let setKeysToCheck = [
      'title',
      'views',
      'rating',
      'actors',
      'releaseDate',
      'genre',
    ];

    let movieData: any = this.movie;

    for (let key of setKeysToCheck) {
      let newValue = this.movieForm.get(key)?.value || '';
      let oldValue = movieData[key] || '';
      let compNewValue = newValue;
      let compOldValue = oldValue;
      if (key === 'releaseDate') {
        compNewValue = new Date(newValue).toLocaleDateString();
        compOldValue = new Date(oldValue).toLocaleDateString();
      }

      if (key === 'genre') {
        newValue.sort();
        oldValue.sort();
        compNewValue = newValue.join(', ');
        compOldValue = oldValue.join(', ');
      }

      if (key === 'rating') {
        compNewValue = this.selectedRating;
        newValue = this.selectedRating;
      }

      if (compNewValue !== compOldValue) {
        this.dataChanges.push({
          key: key,
          newValue: newValue,
          oldValue: oldValue,
        });

        this.formEditData[key] = newValue;
      }
    }

    this.confirmationMessage = true;
  }
}
