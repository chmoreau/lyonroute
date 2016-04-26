import {Component,OnInit} from 'angular2/core';
import {AppService} from '../services/app.service'
import {Place} from '../models/place'
import {Checkbox, Button, RadioButton, Dialog} from 'primeng/primeng';

@Component({
	selector: 'search-component',
	templateUrl: 'app/templates/search.component.html',
	directives: [Checkbox, Button, RadioButton, Dialog],
	providers: [AppService]

})
export class SearchComponent implements OnInit {
	value: boolean = true;
	display: boolean = false;
	selectedValue: string;
	options: any;

	places: Place[];
	errorMessage: any;

	constructor(private _appService: AppService) { }

	onclick() {
		console.log("click");
		this.display=true;
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
