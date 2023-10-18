import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Output() showModal = new EventEmitter<boolean>();
  @Output() sort = new EventEmitter<{}>();
  @Output() filter = new EventEmitter<{}>();

  sortMovies(key: string) {
    let sort = JSON.stringify({ [key]: -1 });
    this.sort.emit({ sort });
  }

  filterMovies(event: any) {
    let search = event.target.value;
    if (search === null || search === undefined) {
      return;
    }

    this.filter.emit({ title: search });
  }
}
