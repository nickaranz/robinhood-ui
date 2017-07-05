import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RobinhoodService, } from './api/robinhood.service';
import { AccountsAPI } from './api/accounts.api';
import { LoginAPI } from './api/login.api';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ToolbarComponent, NavbarComponent],
    exports: [ToolbarComponent, NavbarComponent, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [LoginAPI, AccountsAPI, RobinhoodService]
        };
    }
}
