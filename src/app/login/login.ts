import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
    formulario:FormGroup;
    private readonly http:HttpClient;

    constructor(private fb:FormBuilder, http:HttpClient){
      this.formulario = this.fb.group(
        {
          correo:['',[Validators.required,Validators.email]],
          contrasena:['',Validators.required]
        }

      );
      this.http = http;
    }

    login(){
      if(this.formulario.valid){
        this.http.post("http://localhost:8080/usuario/login",
          this.formulario.value).subscribe(
            retorno => this.validar(retorno)
          )
      }
      else{
        alert("Complete la información");
      }
    }

    validar(usuario:any){
      if(usuario?.idUsuario){
        location.href = "/bienvenida";
      }
      else{
        alert("Usuario o password invalido");
      }
    }
}
