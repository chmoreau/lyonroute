import {Component,OnInit} from 'angular2/core';
import {AppService} from '../services/app.service'
import {Place} from '../models/place'
import {Checkbox, Button, RadioButton, Dialog, AutoComplete} from 'primeng/primeng';

@Component({
	selector: 'search-component',
	templateUrl: 'app/templates/search.component.html',
	directives: [Checkbox, Button, RadioButton, Dialog, AutoComplete],
	providers: [AppService]

})
export class SearchComponent implements OnInit {
	value: boolean = true;
	display: boolean = false;
	selectedValue: string;
	options: any;

	selectedPlace: any;
	filteredPlaces: Place[];


	places: Place[];
	errorMessage: any;

	constructor(private _appService: AppService) { }

	onclick() {
		console.log("click");
		this.display=true;
	}

	filterPlaces(event) {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let query = event.query;
        let filtered: any[] = [];
        for (let i = 0; i < this.places.length; i++) {
            let place = this.places[i];
            if (place.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(place);
            }
        }
        this.filteredPlaces = filtered;
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
