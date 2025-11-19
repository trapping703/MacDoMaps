import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {City} from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private selectedCity = new Subject<City>();
  selectedCity$: Observable<City> = this.selectedCity.asObservable();

  zoomOnSelectedCity(city: City) {
    this.selectedCity.next(city);
  }
}
