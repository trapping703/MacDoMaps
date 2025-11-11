import {Routes} from '@angular/router';
import {TestRoute} from './components/test-route/test-route';
import {MapInteractive} from './components/map-interactive/map-interactive';
import {MapPage} from './components/map-page/map-page';

export const routes: Routes = [
  {path: '', component: TestRoute},
  {path: 'test', component: MapPage}];
