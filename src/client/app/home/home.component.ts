import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { RobinhoodService } from '../shared/api/robinhood.service';

@Component({
    moduleId: module.id,
    selector: 'sd-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

    loginForm: FormGroup;
    mfaEnable: boolean = false;

    constructor(public robinhoodApi: RobinhoodService, private _fb: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.loginFormGroup;
    }

    login(event: any) {
        if (this.loginForm.valid)
            this.robinhoodApi.Login.Auth(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.code)
                .subscribe(resp => this.mfaEnable = resp.mfa_required);
    }

    get loginFormGroup() {
        return this._fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            code: ['',]
        });
    }
}
