import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import { RouteParams } from 'angular2/router';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdRadioButton} from '@angular2-material/radio';
import {MdButton} from '@angular2-material/button';
import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
import {AppService} from '../services/app.service';
import {Offer} from '../models/offer';
import {Dialog} from 'primeng/primeng';
import {CookieService} from 'angular2-cookie/core';


@Component({
	selector: 'offers-component',
	templateUrl: 'app/templates/offers.component.html',
	directives: [MD_LIST_DIRECTIVES, MD_CARD_DIRECTIVES, MdRadioButton, MdButton, Dialog],
	providers: [MdRadioDispatcher],
})
export class OffersComponent implements OnInit {
	departure: string;
	arrival: string;
	isReturn : string;
	date: string;
	dateReturn: string;
	offers: Offer[];
	offersReturn: Offer[];
	errorMessage: any;
	sortingOption: string="duration";
	sortingOptionReturn: string="durationReturn";
	private _dialog: boolean = false;
	private _selectedOffer: Offer;
	constructor(private _routeParams: RouteParams, private _appService: AppService, private _cookieService: CookieService) { }

	onChangeSort(event) {
		if(event.value!=this.sortingOption) {
			switch (event.value) {
				case "duration":
				this.sortingOption = event.value;
				this.offers.sort((a:Offer, b:Offer) => a.ride.duration-b.ride.duration);
				break;
				case "rating":
				this.sortingOption = event.value;
				this.offers.sort((a: Offer, b: Offer) => -a.driverRating + b.driverRating);
				break;
				case "seats":
				this.sortingOption = event.value;
				this.offers.sort((a: Offer, b: Offer) => a.ride.seatsAvi - b.ride.seatsAvi);
				break;
				case "date":
				this.sortingOption = event.value;
				this.offers.sort((a: Offer, b: Offer) => this.getDate(a.ride.date).getTime() - this.getDate(b.ride.date).getTime());
				break;
				default:
				break;
			}
		}

		if(event.value!=this.sortingOptionReturn) {
			switch (event.value) {
				case "durationReturn":
					this.sortingOptionReturn = event.value;
					this.offersReturn.sort((a: Offer, b: Offer) => a.ride.duration - b.ride.duration);
					break;
				case "ratingReturn":
					this.sortingOptionReturn = event.value;
					this.offersReturn.sort((a: Offer, b: Offer) => -a.driverRating + b.driverRating);
					break;
				case "seatsReturn":
					this.sortingOptionReturn = event.value;
					this.offersReturn.sort((a: Offer, b: Offer) => a.ride.seatsAvi - b.ride.seatsAvi);
					break;
				case "dateReturn":
					this.sortingOptionReturn = event.value;
					this.offersReturn.sort((a: Offer, b: Offer) => this.getDate(a.ride.date).getTime() - this.getDate(b.ride.date).getTime());
					break;
			}
		}
	}

	ngOnInit() {

		this.departure = this._routeParams.get('departure').replace(new RegExp("%20",'g'), " ");
		this.arrival = this._routeParams.get('arrival').replace(new RegExp("%20", 'g'), " ");

		this.date = this._routeParams.get('date');
		this.dateReturn = this._routeParams.get('dateReturn');

		this.isReturn = this._routeParams.get('isReturn');

		this.getOffers();
		if(this.isReturn)
			this.getReturnOffers();
	}

	getOffers() {
		this._appService.getOffers(this.departure, this.arrival)
		.subscribe(
			offers => {
				this.offers = offers;
				// By default, sort the offers by date
				console.log(this.offers);
				this.onChangeSort({ value: "date" });
			},
			error => this.errorMessage = <any>error);
	}
	getReturnOffers() {
		this._appService.getOffers(this.arrival, this.departure)
			.subscribe(
			offers => {
				this.offersReturn = offers;
				// By default, sort the offers by date
				this.onChangeSort({ value: "dateReturn" });
			},
			error => this.errorMessage = <any>error);
	}

	private getDate(date: any){
		return new Date(date);
	}

	private showDialog(index: number) {
		this._dialog = true;
		this._selectedOffer = this.offers[index];
		
	}

	subscribeOffer(){
		this._appService.subscribeOffer(this._selectedOffer._id, this._cookieService.get("email"))
			.subscribe(response => this._dialog=false);
	}
}