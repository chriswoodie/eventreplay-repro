import { Routes } from '@angular/router';

export const routes: Routes = [
    //     {
    //     path: '',
    //     loadComponent: () => import('./landing/landing.component').then(m => m.Land),
    // },
    {
        path: 'foo',
        loadComponent: () => import('./foo/foo.component').then(m => m.FooComponent),
    }
];
