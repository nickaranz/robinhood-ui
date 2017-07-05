import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { RobinhoodService } from '../../shared/api/robinhood.service';
import { IAccountResponse } from '../../shared/models/responses';
class DataPoint {
    x: number;
    y: number;
    constructor(private date: string, private price: string) {
        this.x = (new Date(date)).getTime();
        this.y = parseFloat(price);
    }
}
@Component({
    moduleId: module.id,
    selector: 'rb-instrument',
    templateUrl: 'instrument.component.html'
})
export class InstrumentComponent {
    symbol: string;
    options: Object;
    instrument: any;
    constructor(public robinhoodApi: RobinhoodService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.symbol = params['id'];
            this.robinhoodApi.Accounts.instrument(params['id'])
                .do(i => this.instrument = i)
                .mergeMap(i => this.getHistoricalData(i))
                .subscribe();
        });
    }
    getHistoricalData(inst: any) {
        console.log(inst.symbol);
        return this.robinhoodApi.Accounts.historical(inst.symbol, 'week', '5year')
            .map(x => x.historicals.map(x => new DataPoint(x.begins_at, x.close_price.toString())))
            .do(data => this.setChartOptions(data, inst));;
    }
    setChartOptions(data: Array<DataPoint>, inst: any) {
        this.options = {
            title: { text: inst.name },
            series: [{
                name: inst.symbol,
                data: data,
                tooltip: {
                    valueDecimals: 2
                },
                color: '#21ce99',
                animation: {
                    duration: 2000
                }
            }],
            chart: {
                width: 650
            },
            navigator: {
                maskFill: 'rgba(33, 206, 153, .25)'
            }
        }
    }
}