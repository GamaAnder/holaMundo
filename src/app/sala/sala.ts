import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-sala',
  styleUrl: './sala.css',
  templateUrl: './sala.html',
})
export class Sala implements OnInit {

  formulario: FormGroup;
  private readonly http: HttpClient;

  salas: any = [];

  sala: any = null;
  constructor(private fb: FormBuilder, http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.formulario = this.fb.group(
      {
        nombre: ['', [Validators.required]],
        filas: ['', Validators.required],
        asientosPorFila: ['', Validators.required]
      }

    );
    this.http = http;

    const guardado = localStorage.getItem('sala');

    if (guardado) {
      try {
        this.sala = JSON.parse(guardado);
      } catch (error) {
        console.error('Error al recuperar la sala:', error);
        localStorage.removeItem('sala');
      }
    }

  }

  ngOnInit(): void {
    this.buscarSalas();
  }

  buscarSalas() {
    this.http.get("http://localhost:8080/sala/buscar").subscribe(
      data => {
        this.salas = data;
        this.cdr.detectChanges();
      }
    )
  }

  mostrarSalas(salas: any) {
    this.salas = salas;
    this.cdr.detectChanges;
  }

  guardarSala() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      this.http.post("http://localhost:8080/sala/guardar", temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

  eliminarSala(idSala: number) {
    this.http.delete("http://localhost:8080/sala/eliminar/" + idSala).subscribe(
      () => this.buscarSalas()
    );
  }

  mostrar(data: any) {
    if (data?.idSala) {
      alert("Sala creada con el id: " + data.idSala);
      this.buscarSalas();
    }
    else {
      alert("Error al crear sala, existe un problema en el servidor.")
    }
  }
}
