import {Routes} from '@angular/router';

import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { ListExampleComponent } from './list-example/list-example.component';
import { GridExampleComponent } from './grid-example/grid-example/grid-example.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'grid',
    },
    {
        path: 'buttons',
        component: ButtonExampleComponent
    },
    {
        path: 'cards',
        component: CardExampleComponent
    },
    {
        path: 'list',
        component: ListExampleComponent
    },
    {
        path: 'grid',
        component: GridExampleComponent
    }
];
