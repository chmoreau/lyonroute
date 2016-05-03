import {Component} from 'angular2/core';
import {SearchComponent} from './components/search.component';
import {OffersComponent} from './components/offers.component';
import {LoginComponent} from './components/login.component';
import {OfferRideComponent} from './components/offerRide.component';
import {MyRidesComponent} from './components/myRides.component';
import {MonProfilComponent} from './components/monProfil.component';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {AppService} from './services/app.service'
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'my-app',

    template: `<md-toolbar class="primary">
    				<img class="logo" (click)="goHome()" src="img/logo_inverse.png">
				  <strong>LyonRoute&nbsp;&nbsp;</strong> <span class="subtext">Un service de covoiturage différent des autres (si, si).</span>
				  <span class="fill-space"></span>
				  <button  style="color:white" md-button  (click)="_router.navigate(['OfferRide'])">publier</button>
				  <button  style="color:white" md-button  (click)="_router.navigate(['Search'])">Rechercher</button>
				  <button  style="color:white" md-button  (click)="_router.navigate(['MyRides'])">Vos Trajets</button>
				  <button  style="color:white" md-button  (click)="_router.navigate(['MonProfil'])">Votre Profil</button>
				</md-toolbar>
  				<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, MdToolbar, MdButton],
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
	},
	{
		path: '/myRides',
		name: 'MyRides',
		component: MyRidesComponent
	},
	{
		path:'/monProfil',
		name: 'MonProfil',
		component: MonProfilComponent
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginComponent
	}
])

export class AppComponent {
	constructor(private _router: Router) {
	}	
	private goHome() {
		this._router.navigate(['Search']);
	}
}
