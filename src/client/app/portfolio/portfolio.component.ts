import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RobinhoodService } from '../shared/api/robinhood.service';
import { IAccountResponse, IPosition, IPorfolio } from '../shared/models/responses';
import { JsonToCsv } from '../shared/utils/JsonToCsv';

@Component({
    moduleId: module.id,
    selector: 'rb-portfolio',
    templateUrl: 'portfolio.component.html',
    styleUrls: ['portfolio.component.css']
})
export class PortfolioComponent {
    private currentData: Array<IPosition>;
    positions$: Observable<Array<IPosition>>;
    loadingIndicator: boolean = true;
    columns: Array<any> = [];
    getRowClass = this._getRowClass.bind(this);
    portfolio: IPorfolio;
    totalChange: number;
    todayChange: number;

    @ViewChild('viewToggle') viewToggle: any;

    constructor(public robinhoodApi: RobinhoodService) {
    }

    ngOnInit() {
        this.loadPositions();
    }
    loadPositions() {
        this.positions$ = this.robinhoodApi.Accounts.MyPositions
            .map(x => x.results.filter(x => x.quantity > 0)
                .sort((a, b) => a.equity - b.equity)
                .reverse())
            .do((data) => this.onPositionsLoaded(data));
    }
    _getRowClass(row: IPosition) {
        return {
            'up': this.viewToggle && this.viewToggle.checked ? row.return.today >= 0 : row.return.total >= 0,
            'down': this.viewToggle && this.viewToggle.checked ? row.return.today < 0 : row.return.total < 0
        };
    }
    filter(event: any) {
        const val = event.target.value.toLowerCase();
        this.positions$ = Observable.of(this.currentData.filter(p => p.instrument.symbol.toLowerCase().includes(val) || !val));
    }
    export() {
        JsonToCsv.ExportAsCsv(this.currentData);
    }
    private onPositionsLoaded(pos: Array<IPosition>) {
        console.log(pos);
        this.loadingIndicator = false;
        this.currentData = pos;
        this.robinhoodApi.Accounts.MyPortfolio
            .subscribe(p => {
                this.portfolio = p;
                this.totalChange = (p.equity - pos.reduce(((a, c) => a + c.return.cost), 0));
                this.todayChange = (p.equity - p.equity_previous_close);
            });
    }
}
