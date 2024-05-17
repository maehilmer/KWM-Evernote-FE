import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {provide: LOCALE_ID, useValue: 'de'}
  ]
};
