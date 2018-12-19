
import { Routes } from '@angular/router';
import { AvatarShowcaseComponent } from './avatar-showcase/avatar-showcase.component';
import { ButtonShowcaseComponent } from './button-showcase/button-showcase.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { GridShowcaseComponent } from './grid-showcase/grid-showcase.component';
import { ListShowcaseComponent } from './list-showcase/list-showcase.component';
import { ShowcaseComponent } from './showcase.component';
import { DoughnutChartShowcaseComponent } from './doughnut-chart-showcase/doughnut-chart-showcase.component';
import { FontsShowcaseComponent } from './fonts-showcase/fonts-showcase.component';

export const routes: Routes = [
    {
        path: '',
        component: ShowcaseComponent,
        children: [
            {
                path: '',
                redirectTo: 'button',
                pathMatch: 'full',
            },
            {
                path: 'button',
                component: ButtonShowcaseComponent
            },
            {
                path: 'avatar',
                component: AvatarShowcaseComponent
            },
            {
                path: 'card',
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
                path: 'fonts',
                component: FontsShowcaseComponent
            },
            {
                path: 'nativescript-only',
                children: [
                    {
                        path: 'doughnut-chart',
                        component: DoughnutChartShowcaseComponent
                    }
                ]
            },
        ]
    },
];
