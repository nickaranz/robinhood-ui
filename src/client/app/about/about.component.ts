import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RobinhoodService } from '../shared/api/robinhood.service';
import { IAccountResponse, IPosition, IPorfolio } from '../shared/models/responses';


@Component({
    moduleId: module.id,
    selector: 'sd-about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.css']
})
export class AboutComponent {

    positions$: Observable<Array<IPosition>>;
    private currentData: Array<IPosition>;
    loadingIndicator: boolean = true;
    columns: Array<any> = [];
    getRowClass = this._getRowClass.bind(this);
    portfolio: IPorfolio;
    totalCost: number;
    totalChange: number;
    todayChange: number;

    @ViewChild('viewToggle') viewToggle: any;

    constructor(public robinhoodApi: RobinhoodService) {
    }

    ngOnInit() {

        this.loadPositions()
    }
    loadPositions() {
        this.positions$ = this.robinhoodApi.Accounts.MyPositions
            .map(x => x.results.filter(x => x.quantity > 0)
                .sort((a, b) => a.equity - b.equity)
                .reverse())
            .do((data) => this.onLoaded(data));

    }
    onLoaded(pos: Array<IPosition>) {
        this.loadingIndicator = false;
        this.currentData = pos;
        this.totalCost = pos.reduce(((a, c) => a + c.return.cost), 0);
        this.robinhoodApi.Accounts.MyPortfolio
            .subscribe(p => {
                this.portfolio = p;
                this.totalChange = (p.equity - this.totalCost) ;
                this.todayChange = (p.equity - p.equity_previous_close );
            });
    }
    _getRowClass(row: IPosition) {
        return {
            'up': this.viewToggle && this.viewToggle.checked ? row.return.today >= 0 : row.return.total >= 0,
            'down': this.viewToggle && this.viewToggle.checked ? row.return.today < 0 : row.return.total < 0
        };
    }
    search(event: any) {
        const val = event.target.value.toLowerCase();
        this.positions$ = Observable.of(this.currentData.filter(p => p.instrument.symbol.toLowerCase().includes(val) || !val));

    }
}
