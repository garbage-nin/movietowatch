import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/service/movie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() afterAddEvent = new EventEmitter<{}>();
  movie: Movie = {} as Movie;
  movieForm = new FormGroup({
    title: new FormControl('', Validators.required),
    actors: new FormControl('', Validators.required),
    genre: new FormControl([], Validators.required),
    rating: new FormControl(0),
    views: new FormControl(0),
    pinned: new FormControl(false),
    watched: new FormControl(false),
    watchedDate: new FormControl(''),
    releaseDate: new FormControl('', Validators.required),
    imageFile: new FormControl(null),
  });

  stars = [1, 2, 3, 4, 5];
  genreList = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery'];
  selectedRating = 0;
  file: any;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  onImageSelect(event: any): void {
    this.file = event.target.files[0];
    this.movieForm.get('imageFile')?.setValue(this.file);
  }

  addNewMovie(): void {
    this.movieForm.markAllAsTouched();
    this.movieForm.get('rating')?.setValue(this.selectedRating);
    this.movie.genre = this.movieForm.get('genre')!.value || [];
    if (this.movieForm.valid) {
      this.movie = {
        title: this.movieForm.get('title')!.value || '',
        actors: this.movieForm.get('actors')!.value || '',
        genre: this.movieForm.get('genre')!.value || [],
        rating: this.movieForm.get('rating')!.value || 0,
        views: this.movieForm.get('views')!.value || 0,
        pinned: this.movieForm.get('pinned')!.value || false,
        watched: this.movieForm.get('watched')!.value || false,
        watchedDate: this.movieForm.get('watchedDate')!.value || '',
        releaseDate: this.movieForm.get('releaseDate')!.value || '',
      };

      let formData = new FormData();
      formData.append('imageFile', this.file);

      let test: any = this.movie;
      for (let key in test) {
        if (Array.isArray(test[key])) {
          // If it's an array, append each item separately
          test[key].forEach((item: any) => {
            formData.append(`${key}[]`, item);
          });
        } else {
          formData.append(key, test[key]);
        }
      }

      this.movieService.addMovies(formData, this.movie).subscribe((movie) => {
        if (movie) {
          this.closeModal.emit(false);
          this.afterAddEvent.emit({
            message: 'Movie added successfully',
            action: 'Close',
          });
        }
      });
    }
  }
}
