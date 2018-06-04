import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

import swal from 'sweetalert';

@Injectable()
export class HospitalitoService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalHospitales = resp.total;
                return resp.hospitales;
              });

  }

  cargarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.hospital );

  }

  buscarHospitales( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.hospitales );

  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Hospital Borrado', 'Hospi borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital';

    if ( hospital._id ) {
      // actualizando
      url += '/' + hospital._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, hospital )
                .map( (resp: any) => {
                  swal('Hospital Actualizado', hospital.nombre, 'success');
                  return resp.hospital;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, hospital )
              .map( (resp: any) => {
                swal('Hospital Creado', hospital.nombre, 'success');
                return resp.hospital;
              });
    }




  }

}
