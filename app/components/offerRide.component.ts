import {Component} from 'angular2/core';
import {AppService} from '../services/app.service'
import {Place} from '../models/place'
import {Router } from 'angular2/router';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdRadioButton} from '@angular2-material/radio';
import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
import {Calendar} from 'primeng/primeng';
import {MdCheckbox} from '@angular2-material/checkbox';
import {Ride} from '../models/ride'
import {Passenger} from '../models/passenger'
import {FromToComponent} from "./fromTo.component"
import {MapComponent} from "./map.component"

@Component({
    selector: 'offer-ride',
    templateUrl: `app/templates/offerRide.component.html`,
    directives: [MapComponent, FromToComponent, MdButton, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, MdRadioButton, Calendar, MdCheckbox],
	providers: [MdRadioDispatcher]
})


export class OfferRideComponent{
    private _departure: string;
    private _arrival: string;
    private _date: string;
    private _dateReturn: string;
    private _isReturn: boolean;
    private _frequency: string;
    private _detour: number;
    private _seats: number;
    private _mapDeparture: any;
    private _mapArrival: any;

    sendRideOffer(){
        let waypoints: Place[];
        let passengers: Passenger[];
      //  let newRide = new Ride(this.departure, waypoints, this.arrival, this.frequency, this.dateAller, this.detourMax, this.numberFreePlaces, passengers );
        // send
        if (this._dateReturn)
            {
               // let newRide1 = new Ride(this.arrival, waypoints, this.departure, this.frequency, this.dateRetour, this.detourMax, this.numberFreePlaces, passengers );
                   // send
            }

            
    }

}