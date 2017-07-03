import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import { LoginAPI } from './login.api';
import * as M from '.././models/responses';

@Injectable()
export class InstrumentsAPI extends ApiService {
    constructor(public http: Http, public authSvc: LoginAPI) {
        super(http, authSvc);
    }
    instruments(): Observable<M.IPageCollection> {
        return this.get(`${this.ApiUrl}instruments`)
            .do(this.defaultSubscriber);
    }
    instrument(guid: string): Observable<M.IPageCollection> {
        return this.get(`${this.ApiUrl}instruments/${guid}`)
            .do(this.defaultSubscriber);
    }
}
