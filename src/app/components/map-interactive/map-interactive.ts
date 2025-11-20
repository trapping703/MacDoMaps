import {Component, OnInit} from '@angular/core';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import L from "leaflet";
import {map, Subscription} from 'rxjs';
import {MapService} from '../../services/MapService';
import {City} from '../../models/city';
import {NominatimService} from '../../services/NominatimService';
import {Restaurant} from '../../models/restaurant';

@Component({
  selector: 'app-map-interactive',
  imports: [LeafletModule],
  templateUrl: './map-interactive.html',
  styleUrl: './map-interactive.scss',
})
export class MapInteractive implements OnInit {

  subscription: Subscription;
  leafletMap: any;

  constructor(private mapService: MapService, private nominatimService: NominatimService) {
    this.subscription = mapService.selectedCity$.subscribe(city => {
      this.zoomToSelectedCity(city);
    })
  }

  private zoomToSelectedCity(city: City) {
    this.mapService.flyToSelectedCity(city, this.leafletMap);
    this.markRestaurant(city);
  }

  private markRestaurant(city: City) {
    this.nominatimService.searchRestaurants(city).pipe(
      map((restaurants: Restaurant[]) => this.markRestaurants(restaurants)))
      .subscribe();
  }

  private markRestaurants(restaurants: Restaurant[]) {
    for (const restaurant of restaurants) {
      this.mapService.addMarker(restaurant, this.leafletMap);
    }
  }

  ngOnInit(): void {
    this.leafletMap = this.mapService.initMap();
  }

  test(): void {
    this.leafletMap.flyTo(L.latLng(48.8566, 2.3522), 13);
  }
}
