import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  isModalVisible = false;

  displayModal(isVisible: boolean) {
    this.isModalVisible = isVisible;
    console.log(this.isModalVisible);
  }
}
