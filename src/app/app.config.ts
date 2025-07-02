import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideCheckNoChangesConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideCheckNoChangesConfig({exhaustive: true, interval: 1000}),
    provideClientHydration(
      // TODO: Add once stable (and you understand how it works, got empty elements when trying it on app-block-hero)
      withIncrementalHydration(),
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
    provideHttpClient(withFetch(), withInterceptors([])),
    provideRouter(routes, withComponentInputBinding(), withEnabledBlockingInitialNavigation()),
    { provide: LocationStrategy, useClass: PathLocationStrategy },
]
};
