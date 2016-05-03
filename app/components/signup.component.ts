import {Component} from 'angular2/core';
import {AppService} from '../services/app.service';
import {Router} from 'angular2/router';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdToolbar} from '@angular2-material/toolbar';



@Component({
	selector: 'signup',
	templateUrl: 'app/templates/signup.component.html',
	directives: [MD_CARD_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton, MdCheckbox, MdToolbar],
})
export class SignupComponent {
	constructor(private _appService: AppService, private _router: Router) {}
	form = {firstname: "", lastname: "", telnumber: "", address: "", addressPlus: "", email: "", password: "", passwordConfirm: ""};
	private _confirm = false;
	private _pwNotMatch = false;

	onSubmit() {
		let finalForm = this.form;
		if(finalForm.password==finalForm.passwordConfirm) {
			if(finalForm.addressPlus)
				finalForm.address += " "+finalForm.addressPlus;
			delete finalForm.passwordConfirm;
			delete finalForm.addressPlus;
			this._appService.signup(finalForm)
				.subscribe(response => {
					//success
					if(!response.res) {	
						this._confirm = true;
						setTimeout(() => this._router.navigate(['Login']), 2000);
					}
				});

		}
		else {
			this._pwNotMatch = true;
			setTimeout(() => this._pwNotMatch = false, 2000);
			this.form.password = "";
			this.form.passwordConfirm = "";
		}

	}
}