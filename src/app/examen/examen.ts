import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-examen',
  styleUrl: './examen.css',
  templateUrl: './examen.html',
})
export class Examen implements OnInit{

    formulario:FormGroup;
    private readonly http:HttpClient;

    examenes:any = [];

      constructor(private fb:FormBuilder, http:HttpClient){
        this.formulario = this.fb.group(
          {
            carnet:['',[Validators.required,Validators.email]],
            nota:['',Validators.required],
          }

        );
        this.http = http;
        
      }

      ngOnInit(): void {
        this.buscarExamenes();
      }

      buscarExamenes(){
        this.http.get("http://localhost:8080/examen/buscar").subscribe(
          data => this.examenes = data
        )
      }

      guardarExamen(){
        if(this.formulario.valid){
          let temp = {...this.formulario.value};
          temp.fechaCreacion = new Date();
          this.http.post("http://localhost:8080/examen/guardar",temp).subscribe(
            data => this.mostrar(data)
          )
        }
      }

      mostrar(data:any){
        if(data?.idexamen){
          alert("Examen creado con el id: "+data.idexamen);
          this.buscarExamenes();
        }
        else{
          alert("Error al crear Examen, existe un problema en el servidor.")
        }
      }
}
