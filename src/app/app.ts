import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SearchBar} from './search-bar/search-bar';
import {Header} from './header/header';
import {MapInteractive} from './map-interactive/map-interactive';
import {CityList} from './city-list/city-list';
import {RestoCard} from './resto-card/resto-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar, Header, MapInteractive, CityList, RestoCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MacDoMaps');
}
