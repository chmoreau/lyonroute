import {Injectable} from 'angular2/core';
import {Place} from '../models/place';
import {Offer} from '../models/offer';
import {Ride} from '../models/ride';
import {Review} from '../models/review';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class AppService {
	constructor(private http: Http) { }

	private _placesApi = 'app/places.json';
	private _offersApi = 'app/offers.json';
	private _ridesApi = 'app/rides.json';
	private _listReviewApi = 'app/listReview.json';

	private _apiUrl = 'https://damp-retreat-67468.herokuapp.com/all_offers/';
	private _addOfferApi = "https://damp-retreat-67468.herokuapp.com/make_offer/";
	private _url = "app/rues.json";

	getStuff(): Observable<any> {
		return this.http.get(this._url)
			.map(response => {
				let body = response.json();
				return body.values.map(obj => obj.voie);
			})
			.catch(this.handleError);
	}

	addOffer(offer: any): Observable<any> {
		let body = JSON.stringify({ data: offer });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this._addOfferApi, body, options)
			.map(this.extractData)
			.catch(this.handleError);

	}


	getPlaces(): Observable<Place[]> {
		return this.http.get(this._apiUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}
	getOffers(departure?: string, arrival?: string): Observable<Offer[]> {
		let url = this._apiUrl;
		if (departure && arrival)
			url += departure + "/" + arrival;
		console.log(url);
		return this.http.get(url)
			.map(this.extractData)
			.catch(this.handleError);
	}
	getRides(): Observable<Ride[]> {
		return this.http.get(this._ridesApi)
			.map(this.extractData)
			.catch(this.handleError);
	}

	getListReview(): Observable<Review[]> {
		return this.http.get(this._listReviewApi)
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body.data || {};
	}
	private handleError(error: any) {
		// In a real world app, we might send the error to remote logging infrastructure
		let errMsg = error.message || 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}

	private generateName(): string {
		let names = ['Bob', 'Kevin', 'Michel', "Patrick", "Richard"];
		return names[Math.floor(Math.random() * names.length)];
	}

	genereDummyOffer(from: string, to: string): any {
		let departure = { "id": 1, "name": from};
		let arrival = { "id": 1, "name": to};
		let offer = {
			driverEmail: "stancioiu.razvan@yahoo.com",
			driverName: this.generateName(),
			driverAge: 25,
			driverRating: Math.floor(Math.random())*5,
			driverCar: "C3",
			frequency: [],
			ride: {
				departure: departure,
				arrival : arrival,
				date: Date.now().toString(),
				detour: Math.floor(Math.random()) * 10,
				seats: 4,
				duration: 10+Math.floor(Math.random()) * 40,
				seatsAvi: 2
				//passengers: [{name: "Dupond"}, {name: "Dupont"}]
			},
		}
		return offer;
	}
}