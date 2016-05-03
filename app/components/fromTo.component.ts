import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';


declare var google: any;

@Component({
	selector: 'from-to',
	templateUrl: 'app/templates/fromTo.component.html',
	styleUrls: ['app/styles/fromTo.component.css'],
	directives: [MD_INPUT_DIRECTIVES]
})
export class FromToComponent implements OnInit {
	@Output('departure') departureChange = new EventEmitter();
	@Output('arrival') arrivalChange = new EventEmitter();

	private _autocompleteA: any;
	private _autocompleteD: any;

	changeDeparture(value: string) {
		this.departureChange.emit(value);
	}
	changeArrival(value: string) {
		this.arrivalChange.emit(value);
	}

	ngOnInit() {
		let inputD = document.getElementById('departure-input');
		let inputA = document.getElementById('arrival-input');
		let options = {
			componentRestrictions: { country: 'fr' }
		};
		this._autocompleteD = new google.maps.places.Autocomplete(inputD, options);
		this._autocompleteA = new google.maps.places.Autocomplete(inputA, options);
		

		this._autocompleteD.addListener('place_changed', () => {
			let place = this._autocompleteD.getPlace();
			this.changeDeparture(place.formatted_address);
		});
		this._autocompleteA.addListener('place_changed', () => {
			let place = this._autocompleteA.getPlace();
			this.changeArrival(place.formatted_address);
		});
	}

}