import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const COMPONENT_DECLARATIONS: any[] = [
    HomeComponent
];

export const PROVIDERS_DECLARATIONS: any[] = [
];

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];
