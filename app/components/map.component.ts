import {Component, Input, OnInit} from 'angular2/core';

@Component({
    selector: 'map-directions',
    template: `
    <iframe width="450" height="450" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/directions?origin={{departure}}&destination={{arrival}}{{strWaypoints}}&key={{apiKey}}" allowfullscreen></iframe>`

})
export class MapComponent implements OnInit {
	@Input('key') apiKey: string;
	@Input('from') departure: string;
	@Input('to') arrival: string;
	@Input() waypoints: string[];
	strWaypoints: string;

	ngOnInit(){
		if(this.waypoints) {
			this.strWaypoints = "&waypoints=" + this.waypoints.join('|');
		}	
	}
}