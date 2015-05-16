Builds for Angular 2 Material Design module. 

Sources: https://github.com/angular/angular/tree/master/modules/angular2_material

## How to use + Example

To install, simply include `angular2_material.dev.js` and `angular2_material.css` in your application.

Code sample - shows how to use MdCheckbox:

    import {Component, View, bootstrap} from 'angular2/angular2';
    import {MdCheckbox} from 'angular2_material/material';
	
	@Component({
	    selector: 'my-component'
	})
	@View({
		template: `
			<md-checkbox>Please check me</md-checkbox>
		`,
		directives: [MdCheckbox]
	})
	class MyAppComponent {
		/* ... */
	}
