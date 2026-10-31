import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

    usuario:any = null;
      constructor(private fb:FormBuilder, http:HttpClient,
        private cdr: ChangeDetectorRef){
        this.formulario = this.fb.group(
          {
            correo:['',[Validators.required,Validators.email]],
            contrasena:['',Validators.required],
            nombres:['',Validators.required]
          }

        );
        this.http = http;
        
        const guardado = localStorage.getItem('usuario');

        if (guardado) { try { 
          this.usuario = JSON.parse(guardado);
         } catch (error) { 
          console.error('Error al recuperar el usuario:', error); 
          localStorage.removeItem('usuario'); 
          } 
        }

      }

      ngOnInit(): void {
        this.buscarUsuarios();
      }

      buscarUsuarios(){
        this.http.get("http://localhost:8080/usuario/buscar").subscribe(
          data => {
            this.usuarios = data;
            this.cdr.detectChanges();
          }
        )
      }

      mostrarUsuarios(usuarios:any){
        this.usuarios = usuarios;
        this.cdr.detectChanges;
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
        if(data?.idUsuario){
          alert("Usuario creado con el id: "+data.idUsuario);
          this.buscarUsuarios();
        }
        else{
          alert("Error al crear usuario, existe un problema en el servidor.")
        }
      }
}
