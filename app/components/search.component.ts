import {Component,OnInit} from 'angular2/core';
import {AppService} from '../services/app.service'
import {Place} from '../models/place'
import { Router } from 'angular2/router';

import {AutoComplete, Calendar} from 'primeng/primeng';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';


@Component({
	selector: 'search-component',
	templateUrl: 'app/templates/search.component.html',
	styleUrls: ['app/styles/search.component.css'],
	directives: [MdButton, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, AutoComplete, Calendar,MdCheckbox],
})
export class SearchComponent implements OnInit {

	selectedPlace: any;
	filteredDepartures: Place[];
	filteredArrivals: Place[];
	departure: string;
	arrival: string;
	places: Place[];
	errorMessage: any;

	constructor(private _appService: AppService, private _router: Router ) { }

	filterDepartures(term: string) {
		this.filteredDepartures = this.searchPlaces(term);
	}

	filterArrivals(term: string) {
		this.filteredArrivals = this.searchPlaces(term);
	}

	gotoOffers() {
		if(this.departure && this.arrival) {
			let link = ['Offers', { departure: this.departure, arrival: this.arrival }];
			this._router.navigate(link);
		}
		
	}
	searchPlaces(query) {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        if(query.length != 0) {
			for (let i = 0; i < this.places.length; i++) {
				let place = this.places[i];
				if (place.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
					filtered.push(place);
				}
			}
        }
        return filtered;
	}

	ngOnInit() {
		this.getPlaces();
	}

	getPlaces() {
		this._appService.getPlaces()
			.subscribe(
			places => this.places = places,
			error => this.errorMessage = <any>error);
	}
}
