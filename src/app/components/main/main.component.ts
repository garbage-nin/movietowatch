import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/service/movie.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isModalVisible = false;
  movie$: Observable<Movie[]> = this.movieService.getMovies();

  constructor(
    private movieService: MovieService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getMovieImageUrl(imageFilename: string | undefined | null) {
    if (!imageFilename) {
      return '';
    }

    return location.origin + '/api/movies/image/' + imageFilename;
  }

  displayModal(isVisible: boolean) {
    this.isModalVisible = isVisible;
  }

  setToastMessage(event: any) {
    this.openSnackBar(event.message, event.action);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['success-bar'],
      duration: 5000,
    });
  }
}
