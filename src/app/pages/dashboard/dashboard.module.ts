import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { components } from './components';
import { containers } from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { pages } from './pages';
import { services } from './services';
import { dashboardEffects } from './store/effects';
import { dashboardReducers } from './store/reducers';

@NgModule({
  declarations: [...pages, ...containers, ...components],
  providers: [...services],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ...dashboardReducers,
    EffectsModule.forFeature(dashboardEffects)
  ]
})
export class DashboardModule {}
