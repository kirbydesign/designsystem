import {Routes} from '@angular/router';

import { ButtonExampleComponent } from './button-example/button-example.component';
import { CardExampleComponent } from './card-example/card-example.component';
import { ListExampleComponent } from './list-example/list-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';

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
    },
    {
        path: 'list',
        component: ListExampleComponent
    },
    {
        path: 'modals',
        component: ModalExampleComponent
    }
];
