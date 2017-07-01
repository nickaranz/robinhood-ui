import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import { LoginAPI } from './login.api';
@Injectable()
export class AccountsAPI extends ApiService {
    constructor(public http: Http, public authSvc: LoginAPI) {
       super(http, authSvc);
    }
    positions(account: string): Observable<any> {
        return this.get(`${this.ApiUrl}accounts/${account}/positions/`)
            .do(this.defaultSubscriber);
    }
    accounts(): Observable<any> {
        return this.get(`${this.ApiUrl}accounts`)
            .do(this.defaultSubscriber);
    }
}