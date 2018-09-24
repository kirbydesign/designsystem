import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppMenuComponent } from './app-menu/app-menu.component';

export const COMPONENT_DECLARATIONS: any[] = [
    HomeComponent,
    AppMenuComponent
];

export const PROVIDERS_DECLARATIONS: any[] = [
];

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];
