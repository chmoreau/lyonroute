import {Component, OnInit} from 'angular2/core';
import { RouteParams } from 'angular2/router';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {AppService} from '../services/app.service';
import {Offer} from '../models/offer'



@Component({
	selector: 'offers-component',
	templateUrl: 'app/templates/offers.component.html',
	directives: [MD_LIST_DIRECTIVES, MD_CARD_DIRECTIVES]
})
export class OffersComponent implements OnInit {

	departure: string;
	arrival: string;
	offers: Offer[];
	errorMessage: any;
	constructor(private _routeParams: RouteParams, private _appService: AppService) {

	}

	ngOnInit() {
		this.departure = this._routeParams.get('departure');
		this.arrival = this._routeParams.get('arrival');
		this.getOffers();

	}

	getOffers() {
		this._appService.getOffers()
			.subscribe(
			offers => this.offers = offers,
			error => this.errorMessage = <any>error);
	}
}