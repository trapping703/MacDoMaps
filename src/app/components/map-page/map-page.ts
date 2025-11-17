import { Component } from '@angular/core';
import {CityList} from '../city-list/city-list';
import {SearchBar} from '../search-bar/search-bar';
import {MapInteractive} from '../map-interactive/map-interactive';
import {SelectedRestaurant} from '../selected-restaurant/selected-restaurant';

@Component({
  selector: 'app-map-page',
  imports: [
    CityList,
    SearchBar,
    MapInteractive,
    SelectedRestaurant
  ],
  templateUrl: './map-page.html',
  styleUrl: './map-page.scss',
})
export class MapPage {

}
