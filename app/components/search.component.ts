import {Component} from 'angular2/core';
import {Place} from '../models/place'
import {Router} from 'angular2/router';
import {Calendar} from 'primeng/primeng';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdCheckbox} from '@angular2-material/checkbox';
import {FromToComponent} from './fromTo.component'


@Component({
	selector: 'search-component',
	templateUrl: 'app/templates/search.component.html',
	styleUrls: ['app/styles/search.component.css'],
	directives: [FromToComponent, MdButton, MD_CARD_DIRECTIVES, Calendar, MdCheckbox],
})
export class SearchComponent {
	private _departure: string;
	private _arrival: string;
	private _isReturn: boolean;
	private _date: string;
	private _dateReturn: string;

	gotoOffers() {
		let link = ['Offers', { departure: this._departure, arrival: this._arrival }];	
		if (this._departure && this._arrival) {
			if(this._isReturn && this._date && this._dateReturn) {
				this._router.navigate(link);
			}
			else if(this._date){
				this._router.navigate(link);
			}
		}
	}

	gotoMakeOffer() {
		let link = ['OfferRide'];
		this._router.navigate(link);
	}

	constructor(private _router: Router) {}

}
