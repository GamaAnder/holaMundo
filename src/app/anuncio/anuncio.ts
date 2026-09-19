import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AnuncioService } from '../services/anuncio.service';

@Component({
  selector: 'app-anuncio',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './anuncio.html',
  styleUrl: './anuncio.css'
})
export class Anuncio implements OnInit {

  anuncios: any[] = [];

  anuncio = {
    idAnuncio: 0,
    titulo: '',
    descripcion: '',
    fechaPublicacion: '',
    imagen: ''
  };

  constructor(private anuncioService: AnuncioService) {}

  ngOnInit(): void {
    this.buscarAnuncios();
  }

  seleccionarImagen(event: any) {

    const archivo = event.target.files[0];

    if (archivo) {

      const reader = new FileReader();

      reader.onload = () => {
        this.anuncio.imagen = reader.result as string;
      };

      reader.readAsDataURL(archivo);
    }
  }

  guardar() {

    this.anuncioService.guardar(this.anuncio)
      .subscribe({
        next: (respuesta: any) => {

          console.log('Anuncio guardado:', respuesta);

          alert('Anuncio guardado correctamente');

          this.buscarAnuncios();
        },

        error: (error: any) => {

          console.error('Error:', error);

          alert('Error al guardar el anuncio');

        }
      });
  }

  buscarAnuncios() {

    this.anuncioService.buscar()
      .subscribe({
        next: (respuesta: any[]) => {

          console.log('Anuncios:', respuesta);

          this.anuncios = respuesta;

        },

        error: (error: any) => {

          console.error('Error al consultar anuncios:', error);

        }
      });
  }
}