import { Component } from '@angular/core';
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
export class Anuncio {

  anuncio = {
    idAnuncio: 0,
    titulo: '',
    descripcion: '',
    fechaPublicacion: '',
    imagen: ''
  };

  constructor(private anuncioService: AnuncioService) {}

  seleccionarImagen(event: any) {

    const archivo = event.target.files[0];

    if (archivo) {

      const reader = new FileReader();

      reader.onload = () => {

        this.anuncio.imagen = reader.result as string;

        console.log('Imagen convertida a Base64:');
        console.log(this.anuncio.imagen);

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

        },

        error: (error: any) => {

          console.error('Error:', error);

          alert('Error al guardar el anuncio');

        }
      });
  }
}