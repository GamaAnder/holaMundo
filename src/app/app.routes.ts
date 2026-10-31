import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Bienvenida } from './bienvenida/bienvenida';
import { Anuncio } from './anuncio/anuncio';
import { Examen } from './examen/examen';
import {Clasificacion} from './clasificacion/clasificacion';
import {Genero} from './genero/genero';
import {Sala} from './sala/sala';
import { Pelicula } from './pelicula/pelicula';
import {Funcion} from './funcion/funcion';
import {Asiento} from './asiento/asiento';

export const routes: Routes = [
    {path:"", component:Login},
    {path:"bienvenida", component:Bienvenida},
    {path:"anuncio", component: Anuncio},
    {path:"examen", component: Examen},
    {path:"clasificacion", component: Clasificacion},
    {path:"genero", component: Genero},
    {path:"sala", component: Sala},
    {path:"pelicula", component: Pelicula},
    {path:"funcion", component: Funcion},
    {path:"asiento", component: Asiento},

];
