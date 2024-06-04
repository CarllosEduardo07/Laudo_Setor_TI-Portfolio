import { Routes } from '@angular/router';
import { HomeCelularComponent } from './components/celular/home-celular/home-celular.component';
import { HomeComputadorComponent } from './components/computador/home-computador/home-computador.component';
import { HomeGeralComponent } from './components/geral/home-geral/home-geral.component';

export const routes: Routes = [
    {
        path: 'geral',
        component: HomeGeralComponent,
    },
    {
        path: 'homeComputador',
        component: HomeComputadorComponent,
    },
    {
        path: 'homeCelular',
        component: HomeCelularComponent,
    },
    {
        path: '',
        redirectTo: '/geral',
        pathMatch: 'full',
    },
];
