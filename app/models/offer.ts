import {Ride} from './Ride'
export class Offer {
	_id: string;
	driverName: string;
	driverAge: number;
	driverRating: number;
	driverCar: string;
	frequency: string[];
	ride: Ride;
	returnRide: Ride;

	constructor() {
		
	}
}