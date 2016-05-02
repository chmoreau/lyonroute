import {Component, OnInit} from 'angular2/core';
import {Router } from 'angular2/router';
import {AppService} from '../services/app.service';
import {Review} from '../models/review'


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
		this.getListReview();
	}


	listReview: Review[];
	errorMessage: any;

	getListReview() {
		this._appService.getListReview()
			.subscribe(
			listReview => this.listReview = listReview,
			error => this.errorMessage = <any>error);
	}

}