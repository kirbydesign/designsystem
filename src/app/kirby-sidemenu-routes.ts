import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ButtonExampleComponent} from '~/app/examples/button-example/button-example.component';
import {CardExampleComponent} from '~/app/examples/card-example/card-example.component';
import {IntroComponent} from '~/app/intro/intro.component';

export const sidemenuRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: IntroComponent
            },
            {
                path: 'buttons',
                component: ButtonExampleComponent
            },
            {
                path: 'cards',
                component: CardExampleComponent
            }
        ]
    }
];