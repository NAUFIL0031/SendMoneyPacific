import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreFilterPageRoutingModule } from './more-filter-routing.module';

import { MoreFilterPage } from './more-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreFilterPageRoutingModule,
    MoreFilterPage
  ],
  
})
export class MoreFilterPageModule {}
