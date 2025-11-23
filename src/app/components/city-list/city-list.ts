import {Component, OnDestroy} from '@angular/core';
import {NominatimService} from '../../services/NominatimService';
import {City} from '../../models/city';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-city-list',
  imports: [
    AsyncPipe
  ],
  templateUrl: './city-list.html',
  styleUrl: './city-list.scss',
})
export class CityList implements OnDestroy {

  searchedCities$!: Observable<City[]>;
  subscription: Subscription;

  constructor(private nominatimService: NominatimService) {
    this.subscription = this.nominatimService.searchedCities$.subscribe(cities => {
      this.searchedCities$ = cities;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectCity(city: City) {
    this.nominatimService.selectCity(city);
  }
}
