import {Component, OnDestroy} from '@angular/core';
import {CityService} from '../../services/CityService';
import {City} from '../../models/city';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MapService} from '../../services/MapService';

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

  constructor(private cityService: CityService, private mapService: MapService) {
    this.subscription = this.cityService.searchedCities$.subscribe(cities => {
      this.searchedCities$ = cities;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectCity(city: City) {
    this.mapService.zoomOnSelectedCity(city);
  }
}
