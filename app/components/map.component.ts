import {Component, Input, OnInit} from 'angular2/core';

@Component({
    selector: 'map-directions',
    template: `
    <iframe width="450" height="450" frameborder="0" style="border:0"
src="{{_src}}" allowfullscreen></iframe>`

})
export class MapComponent implements OnInit {
	@Input('key') apiKey: string = "AIzaSyBAAJraPqzJLeidBDQZz_-izHgc9mP-0Bw";
	@Input('from') departure: string;
	@Input('to') arrival: string;
	@Input() waypoints: string[] = [];
	private _src: string;

	strWaypoints: string ="";
	private _defaultUrl = "https://www.google.com/maps/embed/v1/place?q=lyon&key=" + this.apiKey;
	private _directionsUrl = "https://www.google.com/maps/embed/v1/directions?origin=" +
		this.departure + "&destination=" + this.arrival + this.strWaypoints + "&key=" + this.apiKey;


	ngOnInit(){
		//this.departure && this.arrival ? this._src=this._directionsUrl : this._src=this._defaultUrl;
	}
	ngOnChanges() {
		if (this.waypoints.length) {
			this.strWaypoints = "&waypoints=" + this.waypoints.join('|');
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