import {Routes} from '@angular/router';
import {TestRoute} from './components/test-route/test-route';
import {MapInteractive} from './components/map-interactive/map-interactive';

export const routes: Routes = [
  {path: '', component: TestRoute},
  {path: 'test', component: MapInteractive}];
