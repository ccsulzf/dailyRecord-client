import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'app-lable-people',
    templateUrl: './label-people.component.html',
    styleUrls: ['./label-people.component.scss']
})
export class LabelPeopleComponent {
    toppings = new FormControl();

    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}
