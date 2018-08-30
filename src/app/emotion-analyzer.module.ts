import { NgModule } from '@angular/core';

import {
  SubComponent,
} from './components/emotion-analyzer';

@NgModule({
  declarations: [
    SubComponent
  ],
  exports: [
    SubComponent
  ],
})
export class SubModule { }
