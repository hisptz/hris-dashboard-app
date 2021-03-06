import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of, throwError } from 'rxjs';
import { DashboardPreferences } from '../models/dashboard-preferences.model';
import { catchError, map, switchMap } from 'rxjs/operators';

const dataStoreNamespace = 'dataStore/dashboard-preferences';
const preferenceFileLink = 'dashboard-config/dashboard-preferences.json';
const defaultDashboardPreferences: DashboardPreferences = {
  id: 'DEFAULT',
  namespace: 'DEFAULT',
  appName: 'Dashboard',
  dashboardSource: 'API',
  favoriteSource: 'API',
  menuAlignment: 'top',
  menuType: 'standard',
  customAttributes: []
};
@Injectable()
export class DashboardPreferencesService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  get() {
    return this._getFromFile();
  }

  create(dashboardPreferences: DashboardPreferences) {
    return this.httpClient
      .post(
        `${dataStoreNamespace}/${dashboardPreferences.id}`,
        dashboardPreferences
      )
      .pipe(map(() => dashboardPreferences));
  }

  update(dashboardPreferences: DashboardPreferences) {
    return this.httpClient
      .put(
        `${dataStoreNamespace}/${dashboardPreferences.id}`,
        dashboardPreferences
      )
      .pipe(map(() => dashboardPreferences));
  }

  private _getFromFile(): Observable<DashboardPreferences> {
    // return this.httpClient
    //   .get(preferenceFileLink, {
    //     isExternalLink: true
    //   })
    //   .pipe(catchError(() => of(null)));

    return of({
      id: 'hris',
      namespace: 'hris',
      appName: 'HRIS Dashboard',
      dashboardSource: 'API',
      favoriteSource: 'API',
      menuAlignment: 'left',
      menuType: 'standard'
    });
  }
}
