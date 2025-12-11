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

  getRename(restaurant: Restaurant): L.Marker {
    return L.marker([restaurant.lat, restaurant.lon], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).bindPopup(`<div class="row g-1">
                            <div class="col-12">
                                ${restaurant.display_name}
                            </div>
                            <div class="col-12">
                                <button type="button" class="btn btn-warning w-40 align-center button-popup"> choisir</button>
                            </div>
                        </div>`)
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
      );
  }

  flyToSelectedCity(city: City, map: L.Map) {
    map.flyTo(L.latLng(city.lat, city.lon), 13);
  }
}
