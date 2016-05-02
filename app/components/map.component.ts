import {Component, Input, AfterViewInit} from 'angular2/core';

declare var google: any;

@Component({
    selector: 'map-directions',
    template: `<div style="height: {{height}};width: {{width}}" id="map"></div>`,
})
export class MapComponent implements AfterViewInit {
	@Input('from') departure: string;
	@Input('to') arrival: string;
	@Input() waypoints = [];
	@Input() width: number = 500;
	@Input() height: number = 500;

	private _directionsService: any;
	private _directionsDisplay: any;
	private _map: any;

	ngAfterViewInit() {
		let myLatlng = new google.maps.LatLng(45.765343, 4.831995); // more or less the center of lyon
		this._directionsDisplay = new google.maps.DirectionsRenderer;
		let mapOptions = {
			zoom: 11,
			center: myLatlng
		};
		this._map = new google.maps.Map(document.getElementById("map"),
			mapOptions);
		this._directionsDisplay.setMap(this._map);
		this._directionsService = new google.maps.DirectionsService();
		this.updateMap();
	}

	ngOnChanges() {
		this.updateMap();
	}

	private updateMap() {
		if (this._directionsService && this.departure && this.arrival) {
			let directionsRequest = {
				origin: this.departure,
				destination: this.arrival,
				travelMode: google.maps.TravelMode.DRIVING,
				waypoints: this.waypoints.map(wypt => { return { location: wypt } }),
				optimizeWaypoints: true,
			};
			this._directionsService.route(directionsRequest, (response, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					this._directionsDisplay.setDirections(response);
				}
			});
		}
	}
}