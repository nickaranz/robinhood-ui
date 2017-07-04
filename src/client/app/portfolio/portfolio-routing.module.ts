import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { InstrumentComponent } from './instrument/instrument.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'portfolio/:id', component: InstrumentComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
