import { provideAppInitializer, ApplicationConfig, inject, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ConfigService } from './core/services/config.service';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { apiBaseUrlInterceptor } from './core/interceptors/api-base-url.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeAr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        apiBaseUrlInterceptor,
        authInterceptor
      ])
    ),
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      return configService.load(); 
    }),
    { provide: LOCALE_ID, useValue: 'ar-EG' }
  ],
};
