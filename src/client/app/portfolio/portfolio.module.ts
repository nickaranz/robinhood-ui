import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MdSlideToggleModule, MdCardModule, MdButton } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';

import { LargeMoneyPipe } from '../shared/pipe/large.money.pipe';
import { PortfolioComponent } from './portfolio.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { RobinhoodService } from '../shared/api/robinhood.service';

@NgModule({
    imports: [CommonModule, PortfolioRoutingModule, NgxDatatableModule, MdSlideToggleModule, MdCardModule, ChartModule.forRoot(require('highcharts/highstock'))],
    declarations: [PortfolioComponent, InstrumentComponent, LargeMoneyPipe],
    exports: [PortfolioComponent],
    providers: [RobinhoodService]
})
export class AboutModule { }