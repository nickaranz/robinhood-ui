import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RobinhoodService } from '../shared/api/robinhood.service';
import { IAccountResponse } from '../shared/models/responses';
@Component({
    moduleId: module.id,
    selector: 'sd-about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})
export class AboutComponent {

    positions: Observable<any>;
    loadingIndicator: boolean = true;
    columns: Array<any> = [];
    constructor(public robinhoodApi: RobinhoodService) {
    }

    ngOnInit() {
        this.loadPositions();
    }
    loadPositions() {
        this.positions = this.robinhoodApi.Accounts.MyPositions
            .do(a => console.log(a))
            .map(x => x.results.filter(x => x.quantity > 0).sort((a, b) => a.equity - b.equity).reverse())
            .do(() => this.loadingIndicator = false);
    }
}
