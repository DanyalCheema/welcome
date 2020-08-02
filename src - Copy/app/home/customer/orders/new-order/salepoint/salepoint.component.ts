import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SalepointService } from 'src/app/_services/salepoint.service';
import { Observable } from 'rxjs';
import { SalePoint } from 'src/app/_models/salepoints.model';

@Component({
  selector: 'app-salepoint',
  templateUrl: './salepoint.component.html',
  styleUrls: ['./salepoint.component.scss']
})
export class SalepointComponent implements OnInit {
  salepoint$: Observable<SalePoint>;

  constructor(private salepointService: SalepointService) { }

  ngOnInit() {
    this.salepoint$ = this.salepointService.salepoint.asObservable();
  }
}
