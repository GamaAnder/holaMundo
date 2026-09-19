import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  private url = 'http://localhost:8080/anuncio';

  constructor(private http: HttpClient) {}

  guardar(anuncio: any): Observable<any> {
    return this.http.post<any>(
      `${this.url}/guardar`,
      anuncio
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