import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor( public _hospitalService: HospitalService,) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
            .subscribe( hospitales => this.hospitales = hospitales );
  }

}
