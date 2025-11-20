import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {City} from '../models/city';
import L from 'leaflet';
import {Restaurant} from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private selectedCity = new Subject<City>();
  selectedCity$: Observable<City> = this.selectedCity.asObservable();

  selectCity(city: City) {
    this.selectedCity.next(city);
  }

  initMap(): L.Map {
    const map = L.map("map").setView([48.8566, 2.3522], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);
    return map;
  }

  addMarker(restaurant: Restaurant, map: L.Map): L.Marker {
    return L.marker([restaurant.lat, restaurant.lon], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).bindPopup(`${restaurant.display_name} <button type="button" class="btn btn-light btn-outline-dark w-100" (click)="test()"> test</button>`)
      .addTo(map);
  }

  flyToSelectedCity(city: City, map: L.Map) {
    map.flyTo(L.latLng(city.lat, city.lon), 13);
  }
}
