import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapInteractive} from './map-interactive';
import {NominatimService} from '../../services/NominatimService';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {LeafletService} from '../../services/LeafletService';
import {Observable, of, Subject} from 'rxjs';
import {City} from '../../models/city';
import {Restaurant} from '../../models/restaurant';

describe('MapInteractive', () => {
  let component: MapInteractive;
  let fixture: ComponentFixture<MapInteractive>;
  let nominatimServiceMock: jasmine.SpyObj<NominatimService>;
  let leafletServiceMock: jasmine.SpyObj<LeafletService>;
  let selectedCityMock: Subject<City>;
  let searchedCityMock: Subject<Observable<City[]>>;

  beforeEach(async () => {
    selectedCityMock = new Subject<City>();
    searchedCityMock = new Subject<Observable<City[]>>();
    const nominatimMock = jasmine.createSpyObj('NominatimService', ['searchRestaurants', 'cleanSearchBar'], {
      selectedCity: selectedCityMock,
      selectedCity$: selectedCityMock.asObservable(),
      searchedCities: searchedCityMock,
      searchedCities$: searchedCityMock.asObservable()
    });
    const leafletMock = jasmine.createSpyObj('LeafletService', ['flyToSelectedCity', 'addMarker', 'initMap']);
    await TestBed.configureTestingModule({
      imports: [MapInteractive],
      providers: [
        {provide: NominatimService, useValue: nominatimMock},
        {provide: LeafletService, useValue: leafletMock},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],

    }).compileComponents();

    nominatimServiceMock = TestBed.inject(NominatimService) as jasmine.SpyObj<NominatimService>;
    leafletServiceMock = TestBed.inject(LeafletService) as jasmine.SpyObj<LeafletService>;
    fixture = TestBed.createComponent(MapInteractive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(leafletServiceMock.initMap).toHaveBeenCalledTimes(1);
  });


  it('should update', () => {
    //given
    const city1: City = {name: "test", lat: 144, lon: 155, display_name: "test"};
    //init pour selection ville
    const restaurant1: Restaurant = {name: "testr1", lat: 165, lon: 265, display_name: "r1"};
    const restaurant2: Restaurant = {name: "testr2", lat: 175, lon: 275, display_name: "r2"};
    nominatimServiceMock.searchRestaurants.and.returnValues(of([restaurant1, restaurant2]));
    //when
    selectedCityMock.next(city1);
    //then
    expect(component).toBeTruthy();
    expect(leafletServiceMock.initMap).toHaveBeenCalledTimes(1);
    expect(leafletServiceMock.flyToSelectedCity).toHaveBeenCalledTimes(1);
    expect(nominatimServiceMock.searchRestaurants).toHaveBeenCalledOnceWith(city1);
    expect(leafletServiceMock.getRename).toHaveBeenCalledTimes(2);
  });
});
