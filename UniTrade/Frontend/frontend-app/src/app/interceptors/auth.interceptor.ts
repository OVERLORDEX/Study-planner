import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  const isPublicRequest =
    req.url.includes('/api/login/') ||
    req.url.includes('/api/register/') ||
    (req.method === 'GET' && req.url.includes('/api/categories/')) ||
    (req.method === 'GET' && req.url.includes('/api/listings/'));

  if (isPublicRequest) {
    return next(req);
  }

  let token: string | null = null;

  if (isBrowser) {
    token = sessionStorage.getItem('access');
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};