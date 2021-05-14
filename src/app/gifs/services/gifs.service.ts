import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    :  string = 'v01OlIr8hwot2QIrm307jddBGdQ2bGBp';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial:  string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if ( localStorage.getItem('historial') ) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')! );
    // }

  }

  buscarGifs( query: string = '') {
    
    // La búsqueda no permite espacios en el texto y se mostrará en minúscula -> (Esto quiere decir que si busco lo mismo en 
    // mayúscula o minúscula no se repetirá en el historial de 10).
    query = query.trim().toLowerCase();

    // Evita que se busque algo que ya está en el historial y solo muestra un máximo de 10 en el arreglo.
    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '15')
          .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
          .subscribe( ( resp ) => {
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify( this.resultados ));
          });

  }

}
