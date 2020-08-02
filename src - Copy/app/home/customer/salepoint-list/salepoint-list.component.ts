import { Component, OnInit } from '@angular/core';
import { SalepointService } from 'src/app/_services/salepoint.service';
import { SalePoint } from 'src/app/_models/salepoints.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';

@Component({
  selector: 'app-salepoint-list',
  templateUrl: './salepoint-list.component.html',
  styleUrls: ['./salepoint-list.component.scss']
})
export class SalepointListComponent implements OnInit {

  public salepoints: SalePoint;
  public tempsalepoints: SalePoint;
  pageSize = 5;
  city: string;

  constructor(
    private salepointService: SalepointService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('address');
    this.salepointService.getSalepointByAddress(this.city).subscribe(data => {
      this.salepoints = data;
      console.log(data);
    });
  }

  salepointHome(salepoint) {
    // saving salepointId to local storage
    this.localStorage.saveSalepointId(salepoint.id);
    this.salepointService.salepoint.next(salepoint);
    this.router.navigate(['../../salepoint', salepoint.id], { relativeTo: this.route });
  }

}
