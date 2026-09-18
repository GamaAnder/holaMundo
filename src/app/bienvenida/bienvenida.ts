import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-bienvenida',
  styleUrl: './bienvenida.css',
  templateUrl: './bienvenida.html',
})
export class Bienvenida implements OnInit{

    formulario:FormGroup;
    private readonly http:HttpClient;

    usuarios:any = [];

      constructor(private fb:FormBuilder, http:HttpClient){
        this.formulario = this.fb.group(
          {
            email:['',[Validators.required,Validators.email]],
            password:['',Validators.required],
            nombre:['',Validators.required]
          }

        );
        this.http = http;
        
      }

      ngOnInit(): void {
        this.buscarUsuarios();
      }

      buscarUsuarios(){
        this.http.get("http://localhost:8080/usuario/buscar").subscribe(
          data => this.usuarios = data
        )
      }

      guardarUsuario(){
        if(this.formulario.valid){
          let temp = {...this.formulario.value};
          temp.fechaCreacion = new Date();
          this.http.post("http://localhost:8080/usuario/guardar",temp).subscribe(
            data => this.mostrar(data)
          )
        }
      }

      mostrar(data:any){
        if(data?.idusuario){
          alert("Usuario creado con el id: "+data.idusuario);
          this.buscarUsuarios();
        }
        else{
          alert("Error al crear usuario, existe un problema en el servidor.")
        }
      }
}
