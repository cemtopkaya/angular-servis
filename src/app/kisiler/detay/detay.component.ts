import { Component, OnInit } from '@angular/core';


// Düz sınıftan servis yaptığımızda
import { Logger } from 'src/app/logger';

/* Typescript derleyicisinin tipi tanıması için 
 * aşağıdaki gibi dosyayı import ediyoruz
 * aksi halde this.loggerService.log("..") hata verirdi
 */
import { LoggerService } from 'src/app/logger.service';

@Component({
  selector: 'app-detay',
  template: `
    <p>
      detay works!
    </p>
  `,
  styles: [],
  providers:[
    /* 
     * Bileşen içinde tanımlı servis 
     * ve parametre bilgileri için sağlanan provide bilgileri daha öncekileri ezer
     * ve yeni bir servis örneği bu bileşen için yaratılır
     */
     LoggerService,  
     {provide: 'mandatoryParamIcinTakmaAd', useValue: 'kisiler detay bileşeni için secimli param değeri'}, 
  ]
})
export class DetayComponent implements OnInit {

  // loggerService parametresine geçirilmek üzere nesneyi angular yarattı
  constructor(private loggerService:LoggerService){}

  ngOnInit() {
    console.log("console.log ngOnInit");
    let logger = new Logger();
    logger.warn("buradayım");

    this.loggerService.log("app-detay::ngOnInit loggerService.log:"+this.loggerService.param1);
  }

}
