import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInteractive } from './map-interactive';

describe('MapInteractive', () => {
  let component: MapInteractive;
  let fixture: ComponentFixture<MapInteractive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapInteractive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapInteractive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
