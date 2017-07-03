import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { InstrumentComponent } from './instrument/instrument.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'portfolio', component: AboutComponent },
      { path: 'portfolio/:id', component: InstrumentComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
