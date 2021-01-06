import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from 'primeng/chart';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ChartModule
  ]
})
export class HomeModule { }
