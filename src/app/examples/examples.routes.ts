import {Routes} from '@angular/router';

import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'buttons',
    },
    {
        path: 'buttons',
        component: ButtonExampleComponent
    },
    {
        path: 'cards',
        component: CardExampleComponent
    }
];
