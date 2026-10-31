import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-clasificacion',
  styleUrl: './clasificacion.css',
  templateUrl: './clasificacion.html',
})
export class Clasificacion implements OnInit {

  formulario: FormGroup;
  private readonly http: HttpClient;

  clasificaciones: any = [];

  clasificacion: any = null;
  constructor(private fb: FormBuilder, http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.formulario = this.fb.group(
      {
        nombre: ['', [Validators.required]],
      }

    );
    this.http = http;

    const guardado = localStorage.getItem('clasificacion');

    if (guardado) {
      try {
        this.clasificacion = JSON.parse(guardado);
      } catch (error) {
        console.error('Error al recuperar la clasificacion:', error);
        localStorage.removeItem('clasificacion');
      }
    }

  }

  ngOnInit(): void {
    this.buscarClasificaciones();
  }

  buscarClasificaciones() {
    this.http.get("http://localhost:8080/clasificacion/buscar").subscribe(
      data => {
        this.clasificaciones = data;
        this.cdr.detectChanges();
      }
    )
  }

  mostrarClasificaciones(clasificaciones: any) {
    this.clasificaciones = clasificaciones;
    this.cdr.detectChanges;
  }

  guardarClasificacion() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      this.http.post("http://localhost:8080/clasificacion/guardar", temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

  eliminarClasificacion(idClasificacion: number) {
    this.http.delete("http://localhost:8080/clasificacion/eliminar/" + idClasificacion).subscribe(
      () => this.buscarClasificaciones()
    );
  }

  mostrar(data: any) {
    if (data?.idClasificacion) {
      alert("Clasificacion creada con el id: " + data.idClasificacion);
      this.buscarClasificaciones();
    }
    else {
      alert("Error al crear la clasificacion, existe un problema en el servidor.")
    }
  }
}
