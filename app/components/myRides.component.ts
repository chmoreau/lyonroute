import {Component, OnInit} from 'angular2/core';
import {MapComponent} from './map.component'
import {AppService} from '../services/app.service'
import {Ride} from '../models/ride'
import {MD_LIST_DIRECTIVES} from '@angular2-material/list'
import {MD_CARD_DIRECTIVES} from '@angular2-material/card'

@Component({
    selector: 'my-rides',
    templateUrl: 'app/templates/myRides.component.html',
    directives: [MapComponent, MD_LIST_DIRECTIVES, MD_CARD_DIRECTIVES]

})
export class MyRidesComponent implements OnInit {
	constructor(private _appService: AppService) {}
	rides: Ride[];
	errorMessage: any;
	private _departure: string;
	private _arrival: string;
	private _waypoints: string[];
	private _showDetails: boolean = false;
	ngOnInit(){
		this.getRides();
	}
	getRides() {
		this._appService.getRides()
			.subscribe(
			rides => this.rides = rides,
			error => this.errorMessage = <any>error);
	}
	showDetails(index: number) {
		this._showDetails=true;
		this._departure = this.rides[index].departure.name;
		this._arrival = this.rides[index].arrival.name;
		if (this.rides[index].waypoints) {
			//transform Place[] to string[]
			this._waypoints = this.rides[index].waypoints.map(place => place.name);
		}
		else {
			this._waypoints = [];
		}
		
	}
	getDate(date:string) {
		return new Date(date);
	}
}
