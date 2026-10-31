
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeliculaService } from '../services/pelicula.service';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './pelicula.html',
  styleUrl: './pelicula.css'
})
export class Pelicula implements OnInit {

  peliculas: any[] = [];

  pelicula = {
    id_pelicula: 0,
    titulo: '',
    sinopsis: '',
    duracionMinutos: '',
    id_genero: 0,
    id_clasificacion: 0,
    imagenPromocional: ''
  };

  constructor(private peliculaService: PeliculaService) { }

  ngOnInit(): void {
    this.buscarpelicula();
  }

  seleccionarImagen(event: any) {

    const archivo = event.target.files[0];

    if (archivo) {

      const reader = new FileReader();

      reader.onload = () => {
        this.pelicula.imagenPromocional = reader.result as string;
      };

      reader.readAsDataURL(archivo);
    }
  }

  guardar(): void {
    this.peliculaService.guardar(this.pelicula)
      .subscribe({
        next: (respuesta: any) => {
          console.log('Película guardada:', respuesta);
          alert('Película guardada correctamente');
          this.buscarpelicula();
        },
        error: (error: any) => {
          console.error('Error al guardar:', error);
          alert('Error al guardar la película');
        }
      });
  }

  buscarpelicula(): void {
    this.peliculaService.buscar()
      .subscribe({
        next: (respuesta: any[]) => {
          console.log('Peliculas:', respuesta);
          this.peliculas = respuesta;
        },
        error: (error: any) => {
          console.error(
            'Error al consultar las películas:',
            error
          );
        }
      });
  }
}
