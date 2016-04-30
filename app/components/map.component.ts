import {Component, Input, OnInit, EventEmitter, Output} from 'angular2/core';

@Component({
    selector: 'map-directions',
    template: `
    <iframe width="{{width}}" height="{{height}}" frameborder="0" style="border:0"
src="{{_src}}" allowfullscreen></iframe>`

})
export class MapComponent implements OnInit {
	@Input('key') apiKey: string = "AIzaSyBAAJraPqzJLeidBDQZz_-izHgc9mP-0Bw";
	@Input('from') departure: string;
	@Input('to') arrival: string;
	@Input() waypoints: string[] = [];
	@Input() width: number = 500;
	@Input() height: number = 500;
	private _src: string;

	strWaypoints: string ="";
	private _defaultUrl = "https://www.google.com/maps/embed/v1/place?q=lyon&key=" + this.apiKey;
	private _directionsUrl = "https://www.google.com/maps/embed/v1/directions?origin=" +
		this.departure + "&destination=" + this.arrival + this.strWaypoints + "&key=" + this.apiKey;


	ngOnInit(){
		if (this.departure && this.arrival) {
			this._src = "https://www.google.com/maps/embed/v1/directions?origin=" +
				this.departure + "&destination=" + this.arrival + this.strWaypoints + "&key=" + this.apiKey;
		}
	}
	ngOnChanges() {
		if (this.waypoints.length) {
			this.strWaypoints = "&waypoints=" + this.waypoints.join('|');
		}
		else {
			this.strWaypoints = "";
		}
		if (this.departure && this.arrival) {
			this._src = "https://www.google.com/maps/embed/v1/directions?origin=" +
				this.departure + "&destination=" + this.arrival + this.strWaypoints + "&key=" + this.apiKey;
		}
		else {
			this._src = this._defaultUrl;
		}
	}
}