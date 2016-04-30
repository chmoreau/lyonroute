import {Passenger} from './passenger'
import {Place} from './place'
export class Ride {
    departure: Place;
    waypoints: Place[];
    arrival: Place;
    frequency: string;
    date: string;
    detour: number;
    seatsAvi: number;
    seats: number;
    passengers: Passenger[];

    constructor(
        departure: Place,
        waypoints: Place[],
        arrival: Place,
        frequency: string,
        dateDeparture: string,
        detourMax: number,
        numberFreePlaces: number,
        seats: number,
        passengers: Passenger[]) 
    {
        this.departure = departure;
        this.waypoints = waypoints;
        this.arrival = arrival;
        this.frequency = frequency;
        this.date = dateDeparture;
        this.detour = detourMax;
        this.seatsAvi = numberFreePlaces;
        this.seats = seats;
        this.passengers = passengers;
    }
}