import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AccountsAPI } from './accounts.api';
import { InstrumentsAPI } from './instruments.api';
import { LoginAPI } from './login.api';

@Injectable()
export class RobinhoodService {
    constructor(
        public Accounts: AccountsAPI,
        public Instruments: InstrumentsAPI,
        public Login: LoginAPI) { }
}

