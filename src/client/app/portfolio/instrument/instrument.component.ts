import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { RobinhoodService } from '../../shared/api/robinhood.service';
import { IAccountResponse } from '../../shared/models/responses';
@Component({
    moduleId: module.id,
    selector: 'rb-instrument',
    templateUrl: 'instrument.component.html'
})
export class InstrumentComponent {
    symbol:string;
    constructor(public robinhoodApi: RobinhoodService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.symbol = params['id']; 
        });
    }

}
