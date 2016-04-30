import {Component, OnInit} from 'angular2/core';
import {MapComponent} from './map.component'
import {AppService} from '../services/app.service'
import {Offer} from '../models/offer'
import {MD_LIST_DIRECTIVES} from '@angular2-material/list'
import {MD_CARD_DIRECTIVES} from '@angular2-material/card'

@Component({
    selector: 'my-rides',
    templateUrl: 'app/templates/myRides.component.html',
    directives: [MapComponent, MD_LIST_DIRECTIVES, MD_CARD_DIRECTIVES]

})
export class MyRidesComponent implements OnInit {
	constructor(private _appService: AppService) {}
	offers: Offer[];
	errorMessage: any;
	_departure: string;
	_arrival: string;
	private _showDetails: boolean = false;

	ngOnInit(){
		this.getOffers();
	}

	getOffers() {
		this._appService.getOffers()
			.subscribe(
			offers => this.offers = offers,
			error => this.errorMessage = <any>error);
	}
	getDate(date: any) {
		return new Date(date);
	}
	showDetails() {
		this._showDetails=true;
	}
}
