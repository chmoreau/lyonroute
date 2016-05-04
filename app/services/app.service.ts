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

	private _offersApi = 'app/offers.json';
	private _listReviewApi = 'app/listReview.json';
	private _url = "app/rues.json";

	private _baseUrl = 'https://damp-retreat-67468.herokuapp.com/';
	private _getOffer = 'all_offers/';
	private _makeOffer = "make_offer/";
	private _login = "login/";
	private _signup = "register/";
	private _subscriptions = "my_inscriptions/";
	private _userOffers = "my_offers/";
	private _subscribe = "confirm_offer/";

	getSubscriptions(email: string): Observable<Offer[]> {
		let url = this._baseUrl + this._subscriptions + email; 
		return this.http.get(url)
			.map(this.extractData)
			.catch(this.handleError);
	}

	subscribeOffer(idOffer: string, email: string ) {
		let url = this._baseUrl + this._subscribe;
		let body = JSON.stringify({ data: { email: email, _id: idOffer } });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(url, body, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	getUserOffers(email: string): Observable<Offer[]> {
		let url = this._baseUrl + this._userOffers + email;
		return this.http.get(url)
			.map(this.extractData)
			.catch(this.handleError);
	}
	
	login(email: string, password: string): Observable<any> {
		let url = this._baseUrl+this._login;
		let body = JSON.stringify({ data: {email : email, password: password} });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(url, body, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	signup(form: any): Observable<any> {
		let url = this._baseUrl + this._signup;
		let body = JSON.stringify({ data: form });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(url, body, options)
			.map(this.extractData)
			.catch(this.handleError);
	}

	getStuff(): Observable<any> {
		return this.http.get(this._url)
			.map(response => {
				let body = response.json();
				return body.values.map(obj => obj.voie);
			})
			.catch(this.handleError);
	}

	addOffer(offer: any): Observable<any> {
		let url = this._baseUrl + this._makeOffer;
		let body = JSON.stringify({ data: offer });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(url, body, options)
			.map(this.extractData)
			.catch(this.handleError);

	}

	getOffers(departure?: string, arrival?: string): Observable<Offer[]> {
		let url = this._baseUrl + this._getOffer;
		if (departure && arrival) {
			let addrD = departure.split(',');
			let addrA = arrival.split(',');
			url += addrD[0] + "/" + addrA[0];
		}
		return this.http.get(url)
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
		let names = ['Bob', 'Kevin', 'Michel', "Patrick", "Richard", "Razvan", "Orlando", "Charles","Amjad"];
		return names[Math.round(Math.random() * names.length)];
	}
	private generateCar(): string {
		let cars = ['Renault Clio', 'Dacia Logan', "Mercedes classe A", "Citroen C3", "Fiat 500", "Renault Megane"];
		return cars[Math.round(Math.random() * cars.length)];
	}

	genereDummyOffer(from: string, to: string, wp: string): any {
		let departure = {"name": from, "lat": "10", "lng": "10"};
		let arrival = { "name": to, "lat": "10", "lng": "10" };
		let name = this.generateName();
		let offer = {
			driverEmail: name+"@mail.com",
			driverName: name,
			driverAge: 18+Math.round(Math.random()* 50),
			driverRating: Math.round(Math.random()*5),
			driverCar: this.generateCar(),
			frequency: [],
			ride: {
				departure: departure,
				arrival : arrival,
				waypoints: [{ name: wp, lat: "10", lng: "10" }],
				date: Date.now().toString(),
				detour: Math.round(Math.random() * 10),
				seats: 4,
				duration: 10 + Math.round(Math.random() * 40),
				seatsAvi: 2,
				passengers: [{name: "Dupond"}, {name: "Dupont"}]
			},
		}
		return offer;
	}
}