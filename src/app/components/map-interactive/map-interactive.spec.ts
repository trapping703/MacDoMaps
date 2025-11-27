import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapInteractive} from './map-interactive';
import {NominatimService} from '../../services/NominatimService';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {LeafletService} from '../../services/LeafletService';
import {EMPTY, Observable, of, Subject, Subscription} from 'rxjs';
import {City} from '../../models/city';

describe('MapInteractive', () => {
  let component: MapInteractive;
  let fixture: ComponentFixture<MapInteractive>;
  let nominatimServiceMock: jasmine.SpyObj<NominatimService>;
  let leafletServiceMock: jasmine.SpyObj<LeafletService>;
  let selectedCityMock: Subject<City>;

  beforeEach(async () => {
    const nominatimMock = jasmine.createSpyObj('NominatimService', ['searchRestaurants', 'cleanSearchBar']);
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
    nominatimServiceMock.selectedCity$ = EMPTY;
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
    nominatimServiceMock.selectedCity$ = of({name:'paris',lat:1,lon:1,display_name:'Paris'});
    expect(component).toBeTruthy();
    expect(leafletServiceMock.initMap).toHaveBeenCalledTimes(1);
    expect(leafletServiceMock.flyToSelectedCity).toHaveBeenCalledTimes(1);
  });
});
