import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/logger.service';

@Component({
  selector: 'app-liste',
  template: `
    <p>
      liste works!
    </p>
  `,
  styles: []
})
export class ListeComponent implements OnInit {

  constructor(private loggerService:LoggerService){}

  ngOnInit() {
    this.loggerService.log("app-liste::ngOnInit logger servisi yazdırıyor :"+this.loggerService.hede);
  }

}
