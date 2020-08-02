import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @ViewChild('inputAddress', { static: false }) inputAddress: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onClick() {
    const address = this.inputAddress.nativeElement.value;
    console.log('salepoints address is ' + address);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = address;

    const dialogRef = this.dialog.open(MapDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog reslts: ${result} `);
      if (result) {
        this.router.navigate(['salepoints', address], { relativeTo: this.route });
        console.log('all the sale points');
      }
    });


  }


}
