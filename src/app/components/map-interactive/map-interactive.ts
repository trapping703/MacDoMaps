import {Component, OnInit} from '@angular/core';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {map, Subscription} from 'rxjs';
import {LeafletService} from '../../services/LeafletService';
import {City} from '../../models/city';
import {NominatimService} from '../../services/NominatimService';
import {Restaurant} from '../../models/restaurant';
import L from 'leaflet';

@Component({
  selector: 'app-map-interactive',
  imports: [LeafletModule],
  templateUrl: './map-interactive.html',
  styleUrl: './map-interactive.scss',
})
export class MapInteractive implements OnInit {

  subscription: Subscription;
  leafletMap: any;
  private markers: L.Marker[] = <L.Marker[]>[];

  constructor(private leafletService: LeafletService, private nominatimService: NominatimService) {
    this.subscription = nominatimService.selectedCity$.subscribe(city => {
      this.cleanAllMarkers(this.leafletMap);
      this.zoomToSelectedCity(city);
    })
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
      this.markers.push(this.leafletService.addMarker(restaurant, this.leafletMap));
    }
  }

  ngOnInit(): void {
    this.leafletMap = this.leafletService.initMap();
  }

  cleanAllMarkers(map: L.Map): void {
    if (this.markers) {
      for (const marker of this.markers) {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      }
      this.markers = <L.Marker[]>[];
    }
  }
}
