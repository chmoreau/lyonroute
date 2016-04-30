import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {Place} from '../models/place'
import {AutoComplete} from 'primeng/primeng';
import {AppService} from '../services/app.service'

@Component({
	selector: 'from-to',
	templateUrl: 'app/templates/fromTo.component.html',
	styleUrls: ['app/styles/fromTo.component.css'],
	directives: [AutoComplete]
})
export class FromToComponent implements OnInit {
	@Input() departure: string;
	@Input() arrival: string;
	@Output() departureChange = new EventEmitter();
	@Output() arrivalChange = new EventEmitter();
	@Output() suggestionsChange = new EventEmitter();
	
	filteredDepartures: string[];
	filteredArrivals: string[];
	places: Place[];
	errorMessage: any;
	constructor(private _appService: AppService) {}

	ngOnInit() {
		this.getPlaces();
	}
	getPlaces() {
		this._appService.getPlaces()
			.subscribe(
			places => this.places = places,
			error => this.errorMessage = <any>error);
	}
	filterDepartures(event) {
		this.filteredDepartures = this.searchPlaces(event.query);
		this.suggestionsChange.emit(event.query);
	}

	filterArrivals(event) {
		this.filteredArrivals = this.searchPlaces(event.query);
		this.suggestionsChange.emit(event.query);
	}
    searchPlaces(query) {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        if (query.length != 0) {
			for (let i = 0; i < this.places.length; i++) {
				let place = this.places[i];
				if (place.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
					filtered.push(place.name);
				}
			}
        }
        return filtered;
	}




}