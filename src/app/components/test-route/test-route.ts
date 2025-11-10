import { Component } from '@angular/core';
import {CityList} from "../city-list/city-list";
import {Header} from "../header/header";
import {MapInteractive} from "../map-interactive/map-interactive";
import {RestoCard} from "../resto-card/resto-card";
import {RouterOutlet} from "@angular/router";
import {SearchBar} from "../search-bar/search-bar";

@Component({
  selector: 'app-test-route',
    imports: [
        CityList,
        Header,
        MapInteractive,
        RestoCard,
        RouterOutlet,
        SearchBar
    ],
  templateUrl: './test-route.html',
  styleUrl: './test-route.scss',
})
export class TestRoute {

}
