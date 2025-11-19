import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {City} from '../models/city';
import {map, Observable, Subject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private searchedCities = new Subject<Observable<City[]>>();
  searchedCities$: Observable<Observable<City[]>> = this.searchedCities.asObservable();

  constructor(private http: HttpClient) {
  }

  searchPossibleCities(citySearchBar: String): void{
    this.searchedCities.next(this.http.get<City[]>(`https://nominatim.openstreetmap.org/search?city=${citySearchBar}&format=jsonv2`));
    // return this.http.get<City[]>(`https://nominatim.openstreetmap.org/search?city=${citySearchBar}&format=jsonv2`);
  }

}
