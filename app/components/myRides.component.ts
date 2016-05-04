import {Component, OnInit} from 'angular2/core';
import {MapComponent} from './map.component'
import {AppService} from '../services/app.service'
import {Offer} from '../models/offer'
import {MD_LIST_DIRECTIVES} from '@angular2-material/list'
import {MD_CARD_DIRECTIVES} from '@angular2-material/card'
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'my-rides',
    templateUrl: 'app/templates/myRides.component.html',
    directives: [MapComponent, MD_LIST_DIRECTIVES, MD_CARD_DIRECTIVES]

})
export class MyRidesComponent implements OnInit {
	constructor(private _appService: AppService, private _cookieService: CookieService) { }
	offers: Offer[];
	subscriptions: Offer[];
	errorMessage: any;
	private _departure: string;
	private _arrival: string;
	private _waypoints: string[];
	private _showDetails: boolean = false;
	ngOnInit(){
		let email = this._cookieService.get("email");
		this.getMyOffers(email);
		//this.getSubscriptions(email);
	}
	getMyOffers(email: string) {
		this._appService.getUserOffers(email)
			.subscribe(
			offers => {
				this.offers = offers
				console.log(this.offers);
			},

			error => this.errorMessage = <any>error);
	}
	getSubscriptions(email: string) {
		this._appService.getSubscriptions(email)
			.subscribe(
			offers => this.subscriptions = offers,
			error => this.errorMessage = <any>error);
	}
	private showDetails(offer: Offer) {
		this._showDetails=true;
		this._departure = offer.ride.departure.name;
		this._arrival = offer.ride.arrival.name;
		if (offer.ride.waypoints) {
			//transform Place[] into string[]
			this._waypoints = offer.ride.waypoints.map(place => place.name);
		}
		else {
			this._waypoints = [];
		}
		
	}
	private getDate(date:string) {
		return new Date(date);
	}
}
