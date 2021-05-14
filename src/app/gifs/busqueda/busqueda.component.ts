import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // "!" = Significa que es un operador para asegurarse que el objeto no es null
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  @ViewChild('txtCantidad') txtCantidad!: ElementRef<HTMLInputElement>;
  
  constructor( private gifsService: GifsService ) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    // Evitar valores vacíos
    if ( valor.trim().length === 0 ) {
      return;
    }

    this.gifsService.buscarGifs( valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
