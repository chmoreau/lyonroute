import {Component, OnInit} from 'angular2/core';
import { RouteParams } from 'angular2/router';
@Component({
	selector: 'offers-component',
	templateUrl: 'app/templates/offers.component.html',
})
export class OffersComponent implements OnInit {

	departure: string;
	arrival: string;
	constructor(private _routeParams: RouteParams) {

	}

	ngOnInit() {
		this.departure = this._routeParams.get('departure');
		this.arrival = this._routeParams.get('arrival');
	}
}