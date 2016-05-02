import {Injectable} from 'angular2/core';
import {Place} from '../models/place';
import {Offer} from '../models/offer';
import {Ride} from '../models/ride';
import {Review} from '../models/review';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class AppService {
	constructor(private http: Http) { }

	private _placesApi = 'app/places.json';
	private _offersApi = 'app/offers.json';
	private _ridesApi = 'app/rides.json';
	private _listReviewApi = 'app/listReview.json';

	private _apiUrl = 'https://damp-retreat-67468.herokuapp.com/all_offers/insa/place%20bellecour';

	getPlaces(): Observable<Place[]> {
		return this.http.get(this._placesApi)
			.map(this.extractData)
			.catch(this.handleError);
	}
	getOffers(): Observable<Offer[]> {
		return this.http.get(this._offersApi)
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
}