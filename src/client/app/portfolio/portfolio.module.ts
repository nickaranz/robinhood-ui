import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MdSlideToggleModule, MdCardModule } from '@angular/material';

import { PortfolioComponent } from './portfolio.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { RobinhoodService } from '../shared/api/robinhood.service';

@NgModule({
    imports: [CommonModule, PortfolioRoutingModule, NgxDatatableModule, MdSlideToggleModule, MdCardModule],
    declarations: [PortfolioComponent, InstrumentComponent],
    exports: [PortfolioComponent],
    providers: [RobinhoodService]
})
export class AboutModule { }

