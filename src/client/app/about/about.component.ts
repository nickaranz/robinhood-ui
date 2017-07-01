import { Component } from '@angular/core';

import { RobinhoodService } from '../shared/api/robinhood.service';


@Component({
    moduleId: module.id,
    selector: 'sd-about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})
export class AboutComponent {

    positions: Array<any>;

    constructor(public robinhoodApi: RobinhoodService) {
    }

    ngOnInit() {
        this.loadPositions();
    }
    loadPositions() {
        this.robinhoodApi.Accounts.accounts()            
            .mergeMap((acc: any) => this.robinhoodApi.Accounts.positions(acc.results[0].account_number))
            .subscribe(data => this.positions = data);
    }
}
