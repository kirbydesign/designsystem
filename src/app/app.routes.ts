import {Routes} from '@angular/router';
import {CardDesignerComponent} from './design/card-designer/card-designer.component';
import {sidemenuRoutes} from '~/app/kirby-sidemenu-routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    ...sidemenuRoutes,
    {
        path: 'designer',
        component: CardDesignerComponent,
    },
];