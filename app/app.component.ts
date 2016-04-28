import {Component} from 'angular2/core';
import {SearchComponent} from './components/search.component';
import {OffersComponent} from './components/offers.component';
import {OfferRideComponent} from './components/offerRide.component';
import {AppService} from './services/app.service'
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
    	<a [routerLink]="['Search']">Search</a>
    	<a [routerLink]="['OfferRide']">OfferRide</a>

  		<router-outlet></router-outlet>`,
    directives: [SearchComponent, ROUTER_DIRECTIVES],
    providers: [AppService, ROUTER_PROVIDERS]
})

	@RouteConfig([
		{
			path: '/search',
			name: 'Search',
			component: SearchComponent
		},
		{
			path: '/offers/:departure/:arrival',
			name: 'Offers',
			component: OffersComponent
		},
		{
			path: '/offerRide',
			name: 'OfferRide',
			component: OfferRideComponent
		}

	])

export class AppComponent { }
