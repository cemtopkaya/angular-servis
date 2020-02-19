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
  // providers:[LoggerService]
})
export class DetayComponent implements OnInit {


  // loggerService parametresine geçirilmek üzere nesneyi angular yarattı
  constructor(private loggerService:LoggerService){}

  ngOnInit() {
    console.log("console.log ngOnInit");
    let logger = new Logger();
    logger.log("buradayım");

    this.loggerService.log("app-detay::ngOnInit loggerService.log:"+this.loggerService.hede);
  }

}
