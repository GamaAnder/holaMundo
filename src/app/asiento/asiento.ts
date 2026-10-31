import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-asiento',
  styleUrl: './asiento.css',
  templateUrl: './asiento.html',
})
export class Asiento implements OnInit {

  formulario: FormGroup;
  private readonly http: HttpClient;

  asientos: any = [];

  asiento: any = null;
  constructor(private fb: FormBuilder, http: HttpClient,
    private cdr: ChangeDetectorRef) {
    this.formulario = this.fb.group(
      {
        fila: ['', [Validators.required]],
        numero: ['', [Validators.required]],
      }

    );
    this.http = http;

    const guardado = localStorage.getItem('asiento');

    if (guardado) {
      try {
        this.asiento = JSON.parse(guardado);
      } catch (error) {
        console.error('Error al recuperar el asiento:', error);
        localStorage.removeItem('asiento');
      }
    }

  }

  ngOnInit(): void {
    this.buscarAsientos();
  }

  buscarAsientos() {
    this.http.get("http://localhost:8080/asiento/buscar").subscribe(
      data => {
        this.asientos = data;
        this.cdr.detectChanges();
      }
    )
  }

  mostrarAsientos(asientos: any) {
    this.asientos = asientos;
    this.cdr.detectChanges;
  }

  guardarAsiento() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      this.http.post("http://localhost:8080/asiento/guardar", temp).subscribe(
        data => this.mostrar(data)
      )
    }
  }

  eliminarAsiento(idAsiento: number) {
    this.http.delete("http://localhost:8080/asiento/eliminar/" + idAsiento).subscribe(
      () => this.buscarAsientos()
    );
  }

  mostrar(data: any) {
    if (data?.idAsiento) {
      alert("Asiento creada con el id: " + data.idAsiento);
      this.buscarAsientos();
    }
    else {
      alert("Error al crear el asiento, existe un problema en el servidor.")
    }
  }
}
