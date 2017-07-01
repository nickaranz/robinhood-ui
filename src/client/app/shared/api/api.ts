import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Config } from '../../shared/config/env.config';
import { LoginAPI } from './login.api';

export class ApiService {
    private requestHeaders: Headers;
    public ApiUrl = Config.API;

    constructor(public http: Http, public authSvc: LoginAPI) {
        this.requestHeaders = new Headers();
        this.requestHeaders.append('Accept', 'application/json');
        this.requestHeaders.append('Authorization', this.authSvc.Token);
    }

    get(endpoint: string): Observable<any> {
        return this.http.get(endpoint, this.authHeader)
            .map((res: Response) => res.json())
            .catch(e => this.handleError(e));
    }
    post(endpoint: string, data?: any): Observable<any> {
        return this.http.post(endpoint, data, this.authHeader)
            .map((res: Response) => res.json())
            .catch(e => this.handleError(e));
    }
    get defaultSubscriber() {
        let that = this;
        return {
            next(item: any) { console.log('Next', item); },
            error(err: any) { that.handleError; },
            complete() { }
        }
    }
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    private get authHeader() {
        this.requestHeaders.set('Authorization', `Token ${this.authSvc.Token}`);
        return { headers: this.requestHeaders }
    }
}