import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalitoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-hospital2',
  templateUrl: './hospital2.component.html',
  styles: []
})
export class Hospital2Component implements OnInit {


  hospital: Hospital = new Hospital('', '', '', '');

  constructor(
    public _hospitalService: HospitalitoService,
   ) { }

  ngOnInit() {
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

        // this.router.navigate(['/hospital2', hospital._id]);

      });



  }



}
