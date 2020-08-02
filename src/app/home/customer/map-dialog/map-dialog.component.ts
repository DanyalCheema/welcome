import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalepointService } from 'src/app/_services/salepoint.service';
import { SalePoint } from 'src/app/_models/salepoints.model';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;
  public salepoints: SalePoint;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salepointService: SalepointService) { }

  ngOnInit(): void {
    this.latitude = this.data.lat;
    this.longitude = this.data.lng;
    this.zoom = this.data.zoom;
    console.log('MapDialogComponent' + this.data.lat);
    this.salepointService.getSalepointByAddress(this.data.city).subscribe(data => {
      this.salepoints = data;
      console.log(data);
    });
  }

}
