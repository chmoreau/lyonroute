import {Component, OnInit} from 'angular2/core';
import {Router } from 'angular2/router';
import {AppService} from '../services/app.service';
import {Avis} from '../models/avis'


@Component({
    selector: 'offer-ride',
    templateUrl: `app/templates/monProfil.component.html`,
    directives: [],
	providers: []
})




export class MonProfilComponent implements OnInit {


	constructor( private _appService: AppService) {


	}
	ngOnInit() {
		this.getListAvis();
	}


	listAvis: Avis[];
	errorMessage: any;

getListAvis() {
	this._appService.getListAvis()
			.subscribe(
		listAvis => this.listAvis = listAvis,
			error => this.errorMessage = <any>error);
	}

}