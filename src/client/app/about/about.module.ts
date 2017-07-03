import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AboutComponent } from './about.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { AboutRoutingModule } from './about-routing.module';
import { RobinhoodService } from '../shared/api/robinhood.service';

@NgModule({
    imports: [ CommonModule, AboutRoutingModule, NgxDatatableModule],
    declarations: [AboutComponent, InstrumentComponent],
    exports: [AboutComponent],
    providers: [RobinhoodService]
})
export class AboutModule { }

