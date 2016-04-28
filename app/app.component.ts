import {Component} from 'angular2/core';
import {SearchComponent} from './components/search.component';
import {OffersComponent} from './components/offers.component';
import {OfferRideComponent} from './components/offerRide.component';
import {MapComponent} from './components/map.component'
import {MdToolbar} from '@angular2-material/toolbar';
import {AppService} from './services/app.service'
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'my-app',

    template: `<md-toolbar color="primary">
				  <span>LyonRoute (un service de covoiturage pas comme les autres, non, non)</span>
				  <a [routerLink]="['Search']">Search</a>
				  <a [routerLink]="['OfferRide']">OfferRide</a>
				</md-toolbar>
  				<router-outlet></router-outlet>`,
    directives: [MapComponent, ROUTER_DIRECTIVES, MdToolbar],
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

export class AppComponent {}
