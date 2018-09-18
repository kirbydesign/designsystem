import {Routes} from '@angular/router';

import { ButtonShowcaseComponent } from './button-showcase/button-showcase.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'buttons',
        pathMatch: 'full',
    },
    {
        path: 'buttons',
        component: ButtonShowcaseComponent
    },
    {
        path: 'cards',
        component: CardShowcaseComponent
    }
];
