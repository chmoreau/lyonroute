import {Component, OnInit} from 'angular2/core';
import {AppService} from '../services/app.service';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdToolbar} from '@angular2-material/toolbar';



@Component({
	selector: 'login',
	templateUrl: 'app/templates/login.component.html',
	directives: [MD_CARD_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton, MdCheckbox, MdToolbar],
})
export class LoginComponent {
	constructor(private _appService: AppService) {}
}