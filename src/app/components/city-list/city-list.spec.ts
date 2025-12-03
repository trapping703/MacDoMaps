import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CityList} from './city-list';
import {NominatimService} from '../../services/NominatimService';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Observable, of, Subject} from 'rxjs';
import {City} from '../../models/city';

describe('CityList', () => {
  let component: CityList;
  let fixture: ComponentFixture<CityList>;
  let nominatimServiceMock: jasmine.SpyObj<NominatimService>;
  let subjectMock: Subject<Observable<City[]>>;


  beforeEach(async () => {
    subjectMock = new Subject<Observable<City[]>>();
    const mock = jasmine.createSpyObj('NominatimService', ['selectCity'], {
      'searchedCities': subjectMock,
      'searchedCities$': subjectMock.asObservable()
    });
    await TestBed.configureTestingModule({
      imports: [CityList],
      providers: [
        {provide: NominatimService, useValue: mock},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],

    }).compileComponents();

    nominatimServiceMock = TestBed.inject(NominatimService) as jasmine.SpyObj<NominatimService>;
    fixture = TestBed.createComponent(CityList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create 2 city result and click on it', fakeAsync(() => {
    //given
    const city1: City = {name: "test", lat: 144, lon: 155, display_name: "test"};
    const city2: City = {name: "test2", lat: 144, lon: 155, display_name: "test2"};
    //when
    subjectMock.next(of([city1, city2]));
    //then
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.ownerDocument.querySelectorAll('.col-12').length).toEqual(2);

    const button = fixture.nativeElement.ownerDocument.querySelector('.btn');
    button.click();

    tick();
    fixture.whenStable()

    expect(nominatimServiceMock.selectCity).toHaveBeenCalledOnceWith({
      name: "test",
      lat: 144,
      lon: 155,
      display_name: "test"
    })
  }));
});
