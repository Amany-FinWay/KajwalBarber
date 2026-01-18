import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { switchMap, filter, take } from 'rxjs';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const configService = inject(ConfigService);
  if (req.url.includes('/assets/')) return next(req);

  return configService.config$.pipe(
    take(1),
    switchMap(config => {
      const baseUrl = config.serverUrl.replace(/\/$/, '');
      const endpoint = req.url.startsWith('/') ? req.url : `/${req.url}`;

      return next(
        req.clone({
          url: `${baseUrl}${endpoint}`
        })
      );
    })
  );
};