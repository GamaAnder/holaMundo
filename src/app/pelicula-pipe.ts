import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pelicula',
})
export class PeliculaPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
