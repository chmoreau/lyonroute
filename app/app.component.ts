import {Component} from 'angular2/core';
import {SearchComponent} from './components/search.component';
import {OffersComponent} from './components/offers.component';
import {MdToolbar} from '@angular2-material/toolbar';
import {AppService} from './services/app.service'
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'my-app',
    template: `<md-toolbar color="primary">
				  <span>LyonRoute (un service de covoiturage pas comme les autres)</span>
				  <a [routerLink]="['Search']">Search</a>
				</md-toolbar>
    	
    	
  		<router-outlet></router-outlet>`,
    directives: [SearchComponent, ROUTER_DIRECTIVES, MdToolbar],
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
		}

	])
export class AppComponent { }
