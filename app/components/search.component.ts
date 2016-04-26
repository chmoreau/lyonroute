import {Component} from 'angular2/core';
import {Checkbox, Button, RadioButton} from 'primeng/primeng';




@Component({
	selector: 'search-component',
	templateUrl: 'app/templates/search.component.html',
	directives: [Checkbox, Button, RadioButton],

})
export class SearchComponent {
	value: boolean = true;
	selectedValue: string;

	onclick() {
		console.log("click");
	}
}
