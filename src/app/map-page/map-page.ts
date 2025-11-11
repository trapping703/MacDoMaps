import { Component } from '@angular/core';
import {CityList} from '../components/city-list/city-list';
import {SearchBar} from '../components/search-bar/search-bar';
import {MapInteractive} from '../components/map-interactive/map-interactive';

@Component({
  selector: 'app-map-page',
  imports: [
    CityList,
    SearchBar,
    MapInteractive
  ],
  templateUrl: './map-page.html',
  styleUrl: './map-page.scss',
})
export class MapPage {

}
