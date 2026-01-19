import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { inject, provideAppInitializer, LOCALE_ID } from '@angular/core';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { ConfigService } from './app/core/services/config.service';
import { apiBaseUrlInterceptor } from './app/core/interceptors/api-base-url.interceptor';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

registerLocaleData(localeAr);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr({ positionClass: 'toast-bottom-right' }),
    { provide: NgxSpinnerService, useClass: NgxSpinnerService },
    provideHttpClient(
        withInterceptors([apiBaseUrlInterceptor, authInterceptor])
    ),

    provideRouter(routes),
    provideAppInitializer(() => {
        const configService = inject(ConfigService);
        return configService.load();
    }),
    { provide: LOCALE_ID, useValue: 'ar-EG' }
  ],
}).catch(console.error);