import {Component} from '@angular/core';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {map, Subscription} from 'rxjs';
import {LeafletService} from '../../services/LeafletService';
import {City} from '../../models/city';
import {NominatimService} from '../../services/NominatimService';
import {Restaurant} from '../../models/restaurant';
import L, {latLng, tileLayer} from 'leaflet';

@Component({
  selector: 'app-map-interactive',
  imports: [LeafletModule],
  templateUrl: './map-interactive.html',
  styleUrl: './map-interactive.scss',
})
export class MapInteractive {

  subscription: Subscription;
  leafletMap: any;
  leafletOptions: any;
  markers: L.Marker[] = <L.Marker[]>[];

  constructor(private leafletService: LeafletService, private nominatimService: NominatimService) {
    this.subscription = nominatimService.selectedCity$.subscribe(city => {
      this.cleanAllMarkers();
      this.zoomToSelectedCity(city);
    });

    this.leafletOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors'
        })
      ],
      zoom: 6,
      center: latLng(48.8566, 2.3522)
    };

  }

  private zoomToSelectedCity(city: City) {
    this.leafletService.flyToSelectedCity(city, this.leafletMap);
    this.markRestaurant(city);
    this.nominatimService.cleanSearchBar();
  }

  private markRestaurant(city: City) {
    this.nominatimService.searchRestaurants(city).pipe(
      map((restaurants: Restaurant[]) => this.markRestaurants(restaurants)))
      .subscribe();
  }

  private markRestaurants(restaurants: Restaurant[]) {
    for (const restaurant of restaurants) {
      this.markers.push(this.leafletService.getRename(restaurant));
    }
  }

  cleanAllMarkers(): void {
    this.markers = <L.Marker[]>[];
  }

  onMapReady(map: L.Map): void {
    this.leafletMap = map;
  }
}
