import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CityService} from '../../services/CityService';
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

  constructor(private cityService: CityService) {
    this.subscription = this.cityService.searchedCities$.subscribe(cities => {
      this.searchedCities$ = cities;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
