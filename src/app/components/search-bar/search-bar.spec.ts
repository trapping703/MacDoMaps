import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBar } from './search-bar';
import {CityList} from '../city-list/city-list';
import {NominatimService} from '../../services/NominatimService';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;
  let nominatimServiceMock: jasmine.SpyObj<NominatimService>;

  beforeEach(async () => {
    const mock = jasmine.createSpyObj('NominatimService', ['searchPossibleCities','searchedCities','searchedCities$']);
    await TestBed.configureTestingModule({
      imports: [SearchBar],
      providers: [
        {provide: NominatimService, useValue: mock},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],

    }).compileComponents();

    nominatimServiceMock = TestBed.inject(NominatimService) as jasmine.SpyObj<NominatimService>;
    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should search city', () => {
    component.searchForm.setValue({
      searchBar: 'paris'
    });
    component.onSubmitForm();
    expect(nominatimServiceMock.searchPossibleCities).toHaveBeenCalledOnceWith("paris");

  });
});
