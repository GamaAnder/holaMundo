import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-genero',
  styleUrl: './genero.css',
  templateUrl: './genero.html',
})
export class Genero implements OnInit {

  formulario: FormGroup;
  private readonly http: HttpClient;

  generos: any = [];

  genero: any = null;
  constructor(private fb: FormBuilder, http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.formulario = this.fb.group(
      {
        nombre: ['', Validators.required]
      }

    );
    this.http = http;

    const guardado = localStorage.getItem('genero');

    if (guardado) {
      try {
        this.genero = JSON.parse(guardado);
      } catch (error) {
        console.error('Error al recuperar el genero:', error);
        localStorage.removeItem('genero');
      }
    }

  }

  ngOnInit(): void {
    this.buscarGeneros();
  }

  buscarGeneros() {
    this.http.get("http://localhost:8080/genero/buscar").subscribe(
      data => {
        this.generos = data;
        this.cdr.detectChanges();
      }
    )
  }

  mostrarGeneros(generos: any) {
    this.generos = generos;
    this.cdr.detectChanges;
  }

  guardarGenero() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      this.http.post("http://localhost:8080/genero/guardar", temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

  eliminarGenero(idGenero: number) {
    this.http.delete("http://localhost:8080/genero/eliminar/" + idGenero).subscribe(
      () => this.buscarGeneros()
    );
  }

  mostrar(data: any) {
    if (data?.idGenero) {
      alert("genero creado con el id: " + data.idGenero);
      this.buscarGeneros();
    }
    else {
      alert("Error al crear genero, existe un problema en el servidor.")
    }
  }
}
