import {Component, OnInit} from '@angular/core';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import L from "leaflet";
import {Subscription} from 'rxjs';
import {MapService} from '../../services/MapService';

@Component({
  selector: 'app-map-interactive',
  imports: [LeafletModule],
  templateUrl: './map-interactive.html',
  styleUrl: './map-interactive.scss',
})
export class MapInteractive implements OnInit {

  subscription: Subscription;
  map: any;

  constructor(private mapService: MapService) {
    this.subscription = mapService.selectedCity$.subscribe(city => {
      this.map.flyTo(L.latLng(city.lat, city.lon), 13);

      var html = `Mac Donald, Place lucien neuwitth, Châteaucreux, Saint-Etienne, Loire, Auvergne Rône-Alpes, France métropolitaine, 42000, France <button type="button" class="btn btn-light btn-outline-dark w-100" (click)="test()"> test</button>`;



      L.marker([city.lat, city.lon], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      }).bindPopup(html)
        .addTo(this.map);
    })
  }

  // Ajouter des marqueurs initiaux
  ngOnInit(): void {
    this.map = L.map("map").setView([48.8566, 2.3522], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
    this.addMarker(48.8566, 2.3522, 'Bienvenue à Paris !');
    this.addMarker(48.8584, 2.2945, 'Tour Eiffel');
    this.addMarker(48.8606, 2.3376, 'Musée du Louvre');
  }

  // Méthode pour ajouter un marqueur
  addMarker(lat: number, lng: number, popupText: string): void {
    const customOptions = {
      'maxWidth': 1000,
      'width': 600
    };
    const marker = L.marker([lat, lng], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).bindPopup('', customOptions);
    marker.addTo(this.map);
  }

  test(): void {
    this.map.flyTo(L.latLng(48.8566, 2.3522), 13);
  }
}
