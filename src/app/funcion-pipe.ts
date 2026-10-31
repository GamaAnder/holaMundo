import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'funcion',
})
export class FuncionPipe implements PipeTransform {
  transform(value: number, peliculas: any[]): string {


    for(let pelicula of peliculas){
      if(pelicula.idPelicula==value){
        return pelicula.titulo;
      }
    }
    return 'No hay información';
  }
}
