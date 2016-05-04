import {Component} from 'angular2/core';
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
import {AppService} from '../services/app.service'
import {CookieService} from 'angular2-cookie/core';


@Component({
    selector: 'offer-ride',
    templateUrl: `app/templates/offerRide.component.html`,
    directives: [MapComponent, FromToComponent, MdButton, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, MdRadioButton, Calendar, MdCheckbox],
	providers: [MdRadioDispatcher]
})


export class OfferRideComponent{
    constructor(private _appService: AppService, private _cookieService: CookieService) { }
    private _departure: string;
    private _arrival: string;
    private _date: string;
    private _dateReturn: string;
    private _isReturn: boolean;
    private _isFrequency: boolean=false;
    private _frequency: boolean[]=new Array(7);
    private _detour: number;
    private _seats: number;
    private _days = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];
    private _publishSuccess: boolean;


    changeFrequency(value : number){
        if (value == 0) this._isFrequency = false;
        if (value == 1) this._isFrequency = true;
    }

    modifyFrequency(day : number){
     
        this._frequency[day-1] = !this._frequency[day-1];

    }

    sendRideOffer(){
        let waypoints: Place[];
        let passengers: Passenger[];
        let stringFrequencies: string[]=[];
        let days: string[] = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];
        let i = 0;
        for (i = 0; i < this._frequency.length; i++){
            if (this._frequency[i]) 
                stringFrequencies.push(this._days[i]);
        }

        let offer = {
            driverEmail: this._cookieService.get("email"),
            driverName: "Pablo",
            driverAge: 18 + Math.round(Math.random() * 50),
            driverRating: Math.round(Math.random() * 5),
            driverCar: "C3",
            frequency: stringFrequencies,
            ride: {
                departure: { name: this._departure, lat : "10", lng: "10" },
                arrival: { name: this._arrival, lat: "10", lng: "10" },
                date: this._date,
                detour: this._detour,
                seats: 4,
                duration: 10 + Math.round(Math.random() * 40),
                seatsAvi: this._seats,
                passengers: [{ name: "Dupond" }, { name: "Dupont" }]
            }
        };
        if(this._departure && this._arrival) {
            this._appService.addOffer(offer)
                .subscribe(response => {
                    this._publishSuccess = true;
                });
        }
        
            
    }

}