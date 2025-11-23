import {Component} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NominatimService} from '../../services/NominatimService';
import {Restaurant} from '../../models/restaurant';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-selected-restaurant',
  imports: [
    AsyncPipe
  ],
  templateUrl: './selected-restaurant.html',
  styleUrl: './selected-restaurant.scss',
})
export class SelectedRestaurant {

  selectedRestaurant$!: Observable<Restaurant>;
  subscription: Subscription;

  constructor(private nominatimService: NominatimService) {
    this.subscription = nominatimService.selectedResaurant$.subscribe(SelectedRestaurant => {
      this.selectedRestaurant$ = SelectedRestaurant;
    })
  }
}
