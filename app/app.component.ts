import {Component, DoCheck} from 'angular2/core';
import {SearchComponent} from './components/search.component';
import {OffersComponent} from './components/offers.component';
import {LoginComponent} from './components/login.component';
import {SignupComponent} from './components/signup.component';
import {OfferRideComponent} from './components/offerRide.component';
import {MyRidesComponent} from './components/myRides.component';
import {MonProfilComponent} from './components/monProfil.component';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {AppService} from './services/app.service'
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'my-app',

    template: `<md-toolbar class="primary">
    				<img class="logo" (click)="goHome()" src="img/logo_inverse.png">
				  <strong>LyonRoute&nbsp;&nbsp;</strong> <span class="subtext">Un service de covoiturage différent des autres (si, si).</span>
				  <span class="fill-space"></span>
				  <div *ngIf="_mail">
					  <button  style="color:white" md-button  (click)="_router.navigate(['OfferRide'])">publier</button>
					  <button  style="color:white" md-button  (click)="_router.navigate(['Search'])">Rechercher</button>
					  <button  style="color:white" md-button  (click)="_router.navigate(['MyRides'])">Vos Trajets</button>
					  <button  style="color:white" md-button  (click)="_router.navigate(['MonProfil'])">Votre Profil</button>
					  <button  style="color:white" md-button  (click)="logout()">Se déconnecter</button>
				  </div>
				  <div *ngIf="!_mail">
					  <button  style="color:white" md-button  (click)="_router.navigate(['Login'])">se connecter</button>
				  </div>
				</md-toolbar>
  				<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, MdToolbar, MdButton],
    providers: [AppService, ROUTER_PROVIDERS, CookieService]
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
		component: LoginComponent,
		useAsDefault: true
	},
	{
		path: '/signup',
		name: 'Signup',
		component: SignupComponent
	}

])

export class AppComponent implements DoCheck{
	_mail: string;
	constructor(private _router: Router, private _cookieService: CookieService) {
		this._mail = this._cookieService.get("email");
	}	
	private goHome() {
		this._router.navigate(['Search']);
	}
	private logout() {
		this._cookieService.remove("email");
		this._mail = "";
		this._router.navigate(['Login']);
	}
	ngDoCheck() {
		if(!this._mail){
			this._mail = this._cookieService.get("email");
		}
	}
}
