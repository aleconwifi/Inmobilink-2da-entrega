import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalitoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-hospital3',
  templateUrl: './hospital3.component.html',
  styles: []
})
export class Hospital3Component implements OnInit {


  hospital: Hospital = new Hospital('', '', '', '','','','');

  constructor(
    public _hospitalService: HospitalitoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService : ModalUploadService
   ) { 


    activatedRoute.params.subscribe( params => {


      let id = params['id'];

      if (id !== 'nuevo' ){

        this.cargarHospital( id );
      }

    });

   }

  ngOnInit() {

    this._modalUploadService.notificacion.
    subscribe(resp =>{

      this.hospital.img = resp.hospital.img;

    });
  }

  cargarHospital(id: string){

    this._hospitalService.cargarHospital( id )
        .subscribe( hospital =>  {
          
          this.hospital = hospital
          
          
          });


  }

  guardarHospital( f: NgForm ){

    console.log( f.valid);
    console.log(f.value);

  if (f.invalid) {
    return;
  }

  this._hospitalService.guardarHospital(this.hospital)
      .subscribe(hospital => {

        this.hospital._id = hospital._id;

         this.router.navigate(['/hospital3', hospital._id]);

      });



  }

  cambiarFoto(){

    this._modalUploadService.mostrarModal('hospitales', this.hospital._id );
  }



}
