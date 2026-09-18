import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Bienvenida } from './bienvenida/bienvenida';

export const routes: Routes = [
    {path:"", component:Login},
    {path:"bienvenida", component:Bienvenida}
];
