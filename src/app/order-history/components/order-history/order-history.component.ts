import { Component, inject, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistoryService } from '../../order-history.service';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { OrderHistoryResource } from '../../model/order-history';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
})
export class OrderHistoryComponent implements OnInit {
  orderHistory$ = new BehaviorSubject<OrderHistoryResource>(null);
  orderHistoryObservable$ = this.orderHistory$.asObservable();
  subs = new SubSink();
  route = inject(ActivatedRoute);
  router = inject(Router);
  orderHistoryService = inject(OrderHistoryService);
  artistId: string;
  isLoading = true;

  displayedColumns: string[] = [
    'order',
    'orderDate',
    'orderSource',
    'total',
    'view',
  ];

  ngOnInit() {
    this.subs.sink = this.route.paramMap.subscribe((paramMap) => {
      const userUUID = paramMap.get('id');
      this.artistId = paramMap.get('id');

      const url = `${environment.api_base_url}/orders`;

      const params: Map<any, any> = new Map<any, any>();

      params
        .set('resource_name', 'orders')
        .set('filters', `owner=[eq]${userUUID}`)
        .set('page_length', String(100))
        .set('order_by', '[desc]created')
        .set('page_number', String(1));

      this.orderHistoryService.getOrderHistoryResource(url, params).subscribe({
        next: (value: OrderHistoryResource) => {
          if (value && value.data && value.data.length > 0) {
            this.orderHistory$.next(value);
            this.isLoading = false;
          } else {
            this.isLoading = true; // Keep loader if no results
          }

          // console.log('ORDER', this.orderHistory$);
        },
        error: (error) => {
          this.isLoading = true; // Keep loader on error

          console.error('orderHistoryHttpError - 404', error);
        },
      });
    });
  }
}
