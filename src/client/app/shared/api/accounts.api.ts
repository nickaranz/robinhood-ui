import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import { LoginAPI } from './login.api';
import * as M from '.././models/responses';

@Injectable()
export class AccountsAPI extends ApiService {

    private _myAccount: M.IAccount;
    private _myPortfolio: M.IPorfolio;
    private _myPositions: any;

    constructor(public http: Http, public authSvc: LoginAPI) {
        super(http, authSvc);
    }
    get MyAccount(): Observable<M.IAccount> {
        return this._myAccount ?
            Observable.of(this._myAccount) :
            this.accounts()
                .map(acc => acc.results[0])
                .do(x => this._myAccount = x);
    }
    get MyPortfolio(): Observable<M.IPorfolio> {
        return this._myPortfolio ?
            Observable.of(this._myPortfolio) :
            this.MyAccount
                .mergeMap(acc => this.portfolio(acc.account_number))
                .do(x => this._myPortfolio = x);
    }
    get MyPositions(): Observable<M.IPositionsResponse> {
        return this._myPositions ?
            Observable.of(this._myPositions) :
            this.MyAccount
                .mergeMap(acc => this.getPositions(acc.positions)
                    .do((x) => this._myPositions = x));
    }
    positions(account: string): Observable<M.IPositionsResponse> {
        return this.get(`${this.ApiUrl}accounts/${account}/positions/`)
            .do(this.defaultSubscriber);
    }
    accounts(): Observable<M.IAccountResponse> {
        return this.get(`${this.ApiUrl}accounts`)
            .do(this.defaultSubscriber);
    }
    portfolio(account: string): Observable<M.IPorfolio> {
        return this.get(`${this.ApiUrl}accounts/${account}/portfolio/`)
            .do(this.defaultSubscriber);
    }
    instruments(): Observable<M.IPageCollection> {
        return this.get(`${this.ApiUrl}instruments`)

            .do(this.defaultSubscriber);
    }
    instrument(guid: string): Observable<M.IInstrument> {
        return this.get(`${this.ApiUrl}instruments/${guid}`)
            .mergeMap(i => this.expandInstrument(i))
            .do(this.defaultSubscriber);
    }
    historical(symbol: string, interval: string, span: string = 'day', bounds?: string): Observable<M.IHistoricalQuote> {
        return this.get(`${this.ApiUrl}quotes/historicals/${symbol}/?interval=${interval}`);
        //TODO to enum
        //interval=week|day|10minute|5minute|null(all) span=day|week|year|5year|all bounds=extended|regular|trading
    }
    getPositions(url: string): Observable<M.IPositionsResponse> {
        return this.get(url)
            .mergeMap(r => this.expandPositions(r));
    }
    getInstrument(url: string): Observable<M.IInstrument> {
        return this.get(url)
            .mergeMap(i => this.expandInstrument(i));
    }
    expandPositions(r: M.IPageCollection) {
        return Observable.from(r.results)
            .mergeMap(item => this.resolvePosition(item))
            .toArray()
            .map(items => Object.assign(r, {
                results: r.results
            }))
    }
    expandInstrument(i: M.IInstrument) {
        return Observable.forkJoin([
            this.getQuote(i.symbol),
            this.getFundamentals(i.symbol),
            this.get(i.market)
        ]).map(r => Object.assign(i, r[0], r[1], { market: r[2] }));
    }
    getQuote(symbol: string): Observable<M.IQuote> {
        return this.get(`${this.ApiUrl}quotes/${symbol}/`);
    }
    getFundamentals(symbol: string): Observable<M.IQuote> {
        return this.get(`${this.ApiUrl}fundamentals/${symbol}/`);
    }

    private resolvePosition(p: M.IPositionRaw): Observable<M.IPosition> {
        return Observable.forkJoin([this.getInstrument(p.instrument)]) //, this.get(p.account)
            .map((r: Array<any>) => this.formatPosition(p, r[0]))
    }
    private formatPosition(position: M.IPositionRaw, instrument: M.IInstrument) {
        const equity = position.quantity * instrument.last_trade_price,
            cost = position.quantity * position.average_buy_price,
            gain = equity - cost,
            todayChange = instrument.last_trade_price - instrument.previous_close
        return Object.assign(position, {
            instrument: instrument,
            created_at: new Date(position.created_at),
            updated_at: new Date(position.updated_at),
            equity: equity,
            return: {
                cost: cost,
                total: gain,
                totalPerc: gain / cost,
                today: todayChange * position.quantity,
                todayPerc: todayChange / position.average_buy_price
            }
        });
    }
}
