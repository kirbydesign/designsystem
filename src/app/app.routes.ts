import {Routes} from '@angular/router';
import {CardDesignerComponent} from './design/card-designer/card-designer.component';
import {IntroComponent} from '~/app/intro/intro.component';
import {HomeComponent} from '~/app/home/home.component';
import {ButtonShowcaseComponent} from '~/app/showcase/button-showcase/button-showcase.component';
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
                component: ButtonShowcaseComponent
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
