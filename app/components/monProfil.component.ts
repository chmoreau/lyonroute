import {Component, OnInit} from 'angular2/core';
import {Router } from 'angular2/router';
import {AppService} from '../services/app.service';
import {Review} from '../models/review';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';



@Component({
    selector: 'offer-ride',
    templateUrl: `app/templates/monProfil.component.html`,
    directives: [MD_LIST_DIRECTIVES, MD_CARD_DIRECTIVES],
	providers: []
})


export class MonProfilComponent implements OnInit {


	constructor( private _appService: AppService) {


	}
	ngOnInit() {
		this.getListReview();
		//this.generateDummyOffers(15);
	}


	listReview: Review[];
	errorMessage: any;

	getListReview() {
		this._appService.getListReview()
			.subscribe(
			listReview => this.listReview = listReview,
			error => this.errorMessage = <any>error);
	}

	private generateDummyOffers(number: number) {
		this._appService.getStuff()
			.subscribe(
				places => {
					for (let i = 0 ; i<number ; i++) {
						let i = Math.round(Math.random() * 1000);
						let j = Math.round(Math.random() * 1000);
						let k = Math.round(Math.random() * 1000);
						let offer = this._appService.genereDummyOffer(places[i], places[j],places[k]);
						this._appService.addOffer(offer)
							.subscribe(response => {console.log(response)});
					}
				},
				error => this.errorMessage = <any>error);
	}
	private getRating(index: number) {
		return new Array(this.listReview[index].note);
	}

}