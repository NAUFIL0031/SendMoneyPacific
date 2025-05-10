import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreFilterPage } from './more-filter.page';

const routes: Routes = [
  {
    path: '',
    component: MoreFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreFilterPageRoutingModule {}
