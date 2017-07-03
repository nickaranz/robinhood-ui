import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import { LoginAPI } from './login.api';
import * as M from '.././models/responses';

@Injectable()
export class AccountsAPI extends ApiService {
    private _myAccount: M.IAccount;
    private _myPortfolio: any;
    constructor(public http: Http, public authSvc: LoginAPI) {
        super(http, authSvc);
    }
    positions(account: string): Observable<M.IPositionsResponse> {
        return this.get(`${this.ApiUrl}accounts/${account}/positions/`)
            .do(this.defaultSubscriber);
    }
    accounts(): Observable<M.IAccountResponse> {
        return this.get(`${this.ApiUrl}accounts`)
            .do(this.defaultSubscriber);
    }
    getPositions(url: string): Observable<M.IPositionsResponse> {
        return this.get(url)
            .mergeMap((r: M.IPageCollection) =>
                Observable.from(r.results)
                    .mergeMap(item => this.resolvePosition(item))
                    .toArray()
                    .map(items => Object.assign(r, {
                        results: r.results
                    }))
            );
    }
    getInstrument(url: string): Observable<M.IInstrument> {
        return this.get(url)
            .mergeMap((i: M.IInstrument) => Observable.forkJoin([this.getQuote(i.symbol), this.getFundamentals(i.symbol)])
                .map(r => Object.assign(i, r[0], r[1])));
    }
    getQuote(symbol: string): Observable<M.IQuote> {
        return this.get(`${this.ApiUrl}quotes/${symbol}/`);
    }
    getFundamentals(symbol: string): Observable<M.IQuote> {
        return this.get(`${this.ApiUrl}fundamentals/${symbol}/`);
    }
    private resolvePosition(p: M.IPositionRaw): Observable<M.IPosition> {
        return Observable.forkJoin([this.getInstrument(p.instrument), this.MyAccount]) //, this.get(p.account)
            .map((r: Array<any>) => this.formatPosition(p, r[0], r[1]))
    }
    private formatPosition(position: M.IPositionRaw, instrument: M.IInstrument, account: M.IAccount) {
        const equity = position.quantity * instrument.last_trade_price,
            cost = position.quantity * position.average_buy_price,
            gain = equity - cost;
        return Object.assign(position, {
            instrument: instrument, 
            account: account,
            created_at: new Date(position.created_at),
            updated_at: new Date(position.updated_at),
            equity: equity,
            total: {
                return: gain,
                percentage: gain / cost
            }
        });
    }
    get MyAccount(): Observable<M.IAccount> {
        return this._myAccount ?
            Observable.of(this._myAccount) :
            this.accounts()
                .map(acc => acc.results[0])
                .do(x => this._myAccount = x);
    }
    get MyPositions(): Observable<M.IPositionsResponse> {
        return this._myPortfolio ?
            Observable.of(this._myPortfolio) :
            this.MyAccount
                .mergeMap(acc => this.getPositions(acc.positions)
                    .do((x) => this._myPortfolio = x)
                );
    }
}
