import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { RobinhoodService } from '../shared/api/robinhood.service';

@NgModule({
    imports: [CommonModule, AboutRoutingModule],
    declarations: [AboutComponent],
    exports: [AboutComponent],
    providers: [RobinhoodService]
})
export class AboutModule { }
