import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Bienvenida } from './bienvenida/bienvenida';
import { Anuncio } from './anuncio/anuncio';

export const routes: Routes = [
    {path:"", component:Login},
    {path:"bienvenida", component:Bienvenida},
    {path:"anuncio", component: Anuncio}
];
