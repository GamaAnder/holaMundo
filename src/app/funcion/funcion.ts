import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FuncionPipe } from '../funcion-pipe';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FuncionPipe],
  selector: 'app-funcion',
  styleUrl: './funcion.css',
  templateUrl: './funcion.html',
})
export class Funcion implements OnInit {

  formulario: FormGroup;
  private readonly http: HttpClient;

  funciones: any = [];
  salas: any = [];
  peliculas: any = [];
  funcion: any = null;
  asientos: any = [];

  constructor(private fb: FormBuilder, http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.formulario = this.fb.group(
      {
        fecha: ['', [Validators.required]],
        hora: ['', Validators.required],
        precioEntrada: ['', Validators.required],
        idSala: ['', Validators.required],
        idPelicula: ['', Validators.required],
        idAsiento: ['', Validators.required],
      }

    );
    this.http = http;

    const guardado = localStorage.getItem('funcion');

    if (guardado) {
      try {
        this.funcion = JSON.parse(guardado);
      } catch (error) {
        console.error('Error al recuperar la funcion:', error);
        localStorage.removeItem('funcion');
      }
    }

  }

  ngOnInit(): void {
    this.buscarFunciones();
    this.buscarSalas();
    this.buscarPeliculas();
    this.buscarAsientos();
  }

  buscarFunciones() {
    this.http.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {
        this.funciones = data;
        this.cdr.detectChanges();
      }
    )
  }

  buscarSalas() {
    this.http.get("http://localhost:8080/sala/buscar").subscribe(
      data => {
        this.salas = data;
        this.cdr.detectChanges();
      }
    )
  }

  buscarPeliculas() {
    this.http.get("http://localhost:8080/pelicula/buscar").subscribe(
      data => {
        this.peliculas = data;
        this.cdr.detectChanges();
      }
    )
  }

  buscarAsientos() {
    this.http.get("http://localhost:8080/asiento/buscar").subscribe(
      data => {
        this.asientos = data;
        this.cdr.detectChanges();
      }
    )
  }  

  mostrarFunciones(funciones: any) {
    this.funciones = funciones;
    this.cdr.detectChanges;
  }

  guardarFuncion() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      temp.fecha = new Date();
      this.http.post("http://localhost:8080/funcion/guardar", temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

  eliminarFuncion(idFuncion: number) {
    this.http.delete("http://localhost:8080/funcion/eliminar/" + idFuncion).subscribe(
      () => this.buscarFunciones()
    );
  }

  mostrar(data: any) {
    if (data?.idFuncion) {
      alert("Funcion creada con el id: " + data.idFuncion);
      this.buscarFunciones();
    }
    else {
      alert("Error al crear su funcion, existe un problema en el servidor.")
    }
  }
}
