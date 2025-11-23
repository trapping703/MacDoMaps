import {Injectable} from '@angular/core';
import {City} from '../models/city';
import L from 'leaflet';
import {Restaurant} from '../models/restaurant';
import {NominatimService} from './NominatimService';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {

  constructor(private nominatimService: NominatimService) {
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
    }).bindPopup(`${restaurant.display_name} <button type="button" class="btn btn-warning btn-outline-dark w-40 align-center button-popup"> test</button>`)
      .on('popupopen', () => {
        const buttons = document.querySelectorAll('.button-popup');
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            this.nominatimService.selectRestaurant(restaurant);
          })
        })
      })
      .on('popupclose', () => {
          const buttons = document.querySelectorAll('.button-popup');
          buttons.forEach(button => {
            button.removeEventListener('click', () => {
              this.nominatimService.selectRestaurant(restaurant);
            })
          })
        }
      )
      .addTo(map);
  }

  flyToSelectedCity(city: City, map: L.Map) {
    map.flyTo(L.latLng(city.lat, city.lon), 13);
  }
}
