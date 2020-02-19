import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeComponent } from './liste/liste.component';
import { DetayComponent } from './detay/detay.component';
import { LoggerService } from '../logger.service';



@NgModule({
  declarations: [ListeComponent, DetayComponent],
  exports: [ListeComponent, DetayComponent],
  imports: [
    CommonModule
  ],
  // providers:[LoggerService]
})
export class KisilerModule { }
