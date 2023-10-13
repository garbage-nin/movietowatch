import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  movie: Movie = {} as Movie;
  movieForm = new FormGroup({
    title: new FormControl('', Validators.required),
    actor: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    rating: new FormControl(0),
    views: new FormControl(0),
    pinned: new FormControl(false),
    watched: new FormControl(false),
    releaseDate: new FormControl('', Validators.required),
    imageFile: new FormControl(''),
  });

  stars = [1, 2, 3, 4, 5];
  genreList = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery'];
  selectedRating = 0;
  ngOnInit(): void {
    console.log('AddModalComponent initialized');
  }

  addNewMovie(): void {
    this.movieForm.markAllAsTouched();
    this.movieForm.get('rating')?.setValue(this.selectedRating);
    if (this.movieForm.valid) {
      console.log(this.movieForm.valid);
      console.log(this.movieForm.value);
    }
  }
}
