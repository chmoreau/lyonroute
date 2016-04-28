import {Component} from 'angular2/core';
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

@Component({
    selector: 'my- app1',
    templateUrl: `app/templates/offerRide.component.html`,
	directives: [MdButton, MD_INPUT_DIRECTIVES, MD_CARD_DIRECTIVES, AutoComplete,MdRadioButton],
	providers: [MdRadioDispatcher]
})

export class OfferRideComponent {}