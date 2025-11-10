import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SearchBar} from './components/search-bar/search-bar';
import {Header} from './components/header/header';
import {MapInteractive} from './components/map-interactive/map-interactive';
import {CityList} from './components/city-list/city-list';
import {RestoCard} from './components/resto-card/resto-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar, Header, MapInteractive, CityList, RestoCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('MacDoMaps');
}
