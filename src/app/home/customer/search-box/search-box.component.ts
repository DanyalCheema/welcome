import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address= '';
  city: string
  private geoCoder;

  @ViewChild('inputAddress', { static: false }) inputAddress: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(()=>{
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.inputAddress.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          
          for(var i=0; i<place.address_components.length; i++){
            var addr = place.address_components[i];
            if (addr.types[0] == 'locality') 
              this.city = addr.short_name;
          }
          console.log("address type" + this.city)
          console.log("input address"+ this.address)
          // console.log("Place address components"+place.address_components[1].long_name)
        });
      });
    })
  }

  onClick() {
    const inputAddress = this.inputAddress.nativeElement.value;
    console.log('salepoints address is ' + inputAddress);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = {
      lat :this.latitude,
      lng : this.longitude,
      zoom : this.zoom,
      address : this.address,
      city:this.city
    }

    const dialogRef = this.dialog.open(MapDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog reslts: ${result} `);
      if (result) {
        this.router.navigate(['salepoints', this.city], { relativeTo: this.route });
        console.log('all the sale points' + inputAddress);
      }
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results[0].address_components);
      for(var i=0; i<results[0].address_components.length; i++){
        var addr = results[0].address_components[i];
        if (addr.types[0] == 'locality') 
          this.city = addr.short_name;
      }

      // console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
