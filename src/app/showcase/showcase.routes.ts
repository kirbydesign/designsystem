import { Routes } from '@angular/router';
import { AvatarShowcaseComponent } from './avatar-showcase/avatar-showcase.component';
import { ButtonShowcaseComponent } from './button-showcase/button-showcase.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { GridShowcaseComponent } from './grid-showcase/grid-showcase.component';
import { ListShowcaseComponent } from './list-showcase/list-showcase.component';
import { ShowcaseComponent } from './showcase.component';
import { ChartShowcaseComponent } from './chart-showcase/chart-showcase.component';

export const routes: Routes = [
    {
        path: '',
        component: ShowcaseComponent,
        children: [
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
                path: 'avatar',
                component: AvatarShowcaseComponent
            },
            {
                path: 'cards',
                component: CardShowcaseComponent
            },
            {
                path: 'list',
                component: ListShowcaseComponent
            },
            {
                path: 'grid',
                component: GridShowcaseComponent
            },
            {
                path: 'chart',
                component: ChartShowcaseComponent
            }
        ]
    },
];
