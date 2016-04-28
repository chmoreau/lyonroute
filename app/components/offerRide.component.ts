import {Component,OnInit} from 'angular2/core';
import {AppService} from '../services/app.service'
import {Place} from '../models/place'
import { Router } from 'angular2/router';

import {AutoComplete} from 'primeng/primeng';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdRadioButton} from '@angular2-material/radio';
import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
import {Calendar} from 'primeng/primeng';
import {MdCheckbox} from '@angular2-material/checkbox';

@Component({
    selector: 'my- app1',
    templateUrl: `app/templates/offerRide.component.html`,
	directives: [MdButton, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, AutoComplete, MdRadioButton, Calendar,MdCheckbox],
	providers: [MdRadioDispatcher]
})

export class OfferRideComponent implements OnInit{
  	es: any;
	date11: string;

    ngOnInit() {
        this.es = {
            closeText: "Cerrar",
        	prevText: "<Ant",
        	nextText: "Sig>",
        	currentText: "Hoy",
        	monthNames: [ "enero","febrero","marzo","abril","mayo","junio",
        	"julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        	monthNamesShort: [ "ene","feb","mar","abr","may","jun",
        	"jul","ago","sep","oct","nov","dic" ],
        	dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        	dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        	dayNamesMin: [ "D","L","M","X","J","V","S" ],
        	weekHeader: "Sm",
        	dateFormat: "dd/mm/yy",
        	firstDay: 1,
        	isRTL: false,
        	showMonthAfterYear: false,
        	yearSuffix: "" 
        };
    }
}