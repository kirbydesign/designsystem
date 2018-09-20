import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// TODO TRM - Where should IconComponent be imported?
import { IconComponent } from '~/kirby/components/icon/icon.component';


export const COMPONENT_DECLARATIONS: any[] = [
    HomeComponent,
    IconComponent,
];

export const PROVIDERS_DECLARATIONS: any[] = [
];

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];
