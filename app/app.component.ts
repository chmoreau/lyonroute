import {Component} from 'angular2/core';
import {SearchComponent} from './components/search.component';
@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
    	<search-component><search-component>`,
    directives: [SearchComponent]
})
export class AppComponent { }
