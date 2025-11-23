import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {City} from '../models/city';
import {EMPTY, Observable, Subject} from 'rxjs';
import {Restaurant} from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  private searchedCities = new Subject<Observable<City[]>>();
  searchedCities$: Observable<Observable<City[]>> = this.searchedCities.asObservable();

  constructor(private http: HttpClient) {
  }

  searchPossibleCities(citySearchBar: String): void {
    this.searchedCities.next(this.http.get<City[]>(`https://nominatim.openstreetmap.org/search?city=${citySearchBar}&format=jsonv2`));
    // return this.http.get<City[]>(`https://nominatim.openstreetmap.org/search?city=${citySearchBar}&format=jsonv2`);
  }

  cleanSearchBar(): void {
    this.searchedCities.next(EMPTY);
  }

  searchRestaurants(city: City): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`https://nominatim.openstreetmap.org/search?amenity=mcdonald's&city=${city.name}&format=jsonv2`);
  }
}
