import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Config } from '../../shared/config/env.config';

interface ILoginUser {
    username: string,
    password: string,
    mfa_code?: string
}
export interface IAuthResponse {
    mfa_required: boolean;
    mfa_type: string;
    token: string;
}
@Injectable()
export class LoginAPI {
    private storage: any;
    private storageKey = 'rbtoken';
    get Token(): string {
        return this.storage.getItem(this.storageKey);
    }
    get isAuthenticated(): boolean {
        return this.Token !== null;
    }
    constructor(public http: Http, private _router: Router) {
        this.storage = window.localStorage;
        if (!this.isAuthenticated)
            this.toToLogin();
    }

    Auth(username: string, password: string, code?: string): Observable<IAuthResponse> {
        let params: ILoginUser = { username: username, password: password };
        if (code && code !== '') params.mfa_code = code;
        return this.login(params);
    }
    private login(params: ILoginUser) {
        return this.http.post(`${Config.API}api-token-auth/`, params)
            .map((res: Response) => res.json())
            .do(data => this.handleLogin(data));
    }
    private handleLogin(data: IAuthResponse) {
        if (data.token) {            
            this.storage.setItem(this.storageKey, data.token);
            this.goToDashboard();
        }
    }
    private goToDashboard() {
        this._router.navigate(['about']);
    }
    private toToLogin() {
        this._router.navigate(['/']);
    }
    private retrieve(key: string): any {
        let item = this.storage.getItem(key);
        return item && item !== 'undefined' ?
            JSON.parse(this.storage.getItem(key)) :
            null;
    }
    private store(key: string, val: Object) {
        this.storage.setItem(key, JSON.stringify(val));
    }
}
//e38ca56a11902efccca6a4a435cd19b5b617eaf1