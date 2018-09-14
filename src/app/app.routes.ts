import {Routes} from '@angular/router';
import {CardDesignerComponent} from './design/card-designer/card-designer.component';
import {ButtonExampleComponent} from '~/app/examples/button-example/button-example.component';
import {IntroComponent} from '~/app/intro/intro.component';
import {CardExampleComponent} from '~/app/examples/card-example/card-example.component';
import {HomeComponent} from '~/app/home/home.component';
import {CardShowcaseComponent} from '~/app/showcase/card-showcase/card-showcase.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
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
                component: CardShowcaseComponent
            }
        ]
    },
    {
        path: 'designer',
        component: CardDesignerComponent,
    }
];