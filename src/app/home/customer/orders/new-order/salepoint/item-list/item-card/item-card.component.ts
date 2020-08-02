import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-item-card',
//   templateUrl: './item-card.component.html',
//   styleUrls: ['./item-card.component.scss']
// })
// export class itemCardComponent implements OnInit {
//   @Input('item-detail') item: item;
//   @Input('show-icon') showIcon = true;

//   constructor(private _itemservice: itemService, private router: Router, private route: ActivatedRoute) { }

//   ngOnInit(): void {

//   }
//   editView(item) {
//     this.router.navigate([this.router.url, 'edit', item.id]);

//   }

//   deleteitem(item) {
//     this._itemservice.deleteitem(item.id);
//     setTimeout(() => this.router.navigate(['../../'], { relativeTo: this.route }), 100);


//   }

//   ngOnDestroy(): void {
//     // this.subscription.unsubscribe();
//   }



// }
