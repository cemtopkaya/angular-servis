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
  providers:[
    {provide: 'mandatoryParamIcinTakmaAd', useValue: 'kisiler modülü için secimli param değeri'}, // providedIn:root olduğu için burada tanımlamanın bir anlamı olmayacak!
    LoggerService, // providedIn:root olduğu için burada tanımlamanın bir anlamı olmayacak! 
  ]
})
export class KisilerModule { }
