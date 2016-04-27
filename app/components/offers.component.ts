import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import { RouteParams } from 'angular2/router';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdRadioButton} from '@angular2-material/radio';
import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
import {AppService} from '../services/app.service';
import {Offer} from '../models/offer'



@Component({
	selector: 'offers-component',
	templateUrl: 'app/templates/offers.component.html',
	directives: [MD_LIST_DIRECTIVES, MD_CARD_DIRECTIVES, MdRadioButton],
	providers: [MdRadioDispatcher],
})
export class OffersComponent implements OnInit {
	test: any;
	departure: string;
	arrival: string;
	offers: Offer[];
	errorMessage: any;
	sortingOption: string="duration";
	constructor(private _routeParams: RouteParams, private _appService: AppService) {

	}

	onChangeSort(event) {
		if(event.value!=this.sortingOption) {
			switch (event.value) {
				case "duration":
					this.sortingOption = event.value;
					this.offers.sort((a:Offer, b:Offer) => a.fullDuration-b.fullDuration);
					break;
				case "rating":
					this.sortingOption = event.value;
					this.offers.sort((a: Offer, b: Offer) => a.driverRating - b.driverRating);
					break;
				case "seats":
					this.sortingOption = event.value;
					this.offers.sort((a: Offer, b: Offer) => a.seatsAvailable - b.seatsAvailable);
					break;
				default:
					break;
			}
		}
		
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

	getDate(date: any){
		return new Date(date);
	}
}