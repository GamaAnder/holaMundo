import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private url = 'http://localhost:8080/pelicula';

  constructor(private http: HttpClient) {}

  guardar(pelicula: any): Observable<any> {
    return this.http.post<any>(
      `${this.url}/guardar`,
      pelicula
    );
  }

  buscar(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.url}/buscar`
    );
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/eliminar/${id}`
    );
  }
}