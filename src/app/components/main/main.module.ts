import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavigationComponent } from '../navigation/navigation.component';

import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [MainComponent, NavigationComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class MainModule {}
