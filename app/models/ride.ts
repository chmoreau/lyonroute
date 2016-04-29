import {Passenger} from './passenger'
import {Place} from './place'
export class Ride {
    departure: Place;
    waypoints: Place[];
    arrival: Place;
    frequency: string;
    dateDeparture: string;
    detourMax: number;
    numberFreePlaces: number;
    pasengers: Passenger[];

    constructor(departure: Place, waypoints: Place[], arrival: Place, frequency: string, dateDeparture : string, detourMax : number, numberFreePlaces : number, passengers : Passenger[]){
		this.departure = departure;
		this.waypoints = waypoints;
		this.arrival = arrival;
		this.frequency = frequency;
		this.dateDeparture = dateDeparture;
		this.detourMax = detourMax;
		this.numberFreePlaces = numberFreePlaces;
		this.pasengers = passengers;
    }
}