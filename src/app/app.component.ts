import { Component } from '@angular/core';
import { LoggerService } from './logger.service';


@Component({
  selector: 'app-root',
  template: `
    <h1>App Welcome</h1>
    <app-detay></app-detay>
    <app-liste></app-liste>
  `,
  styles: [`h1{color:red;}`]
})
export class AppComponent {
  title = 'servis';

  constructor(private loggerService:LoggerService){}

  ngOnInit(): void {
    this.loggerService.param1 = "hadi"
    this.loggerService.log("app-root::ngOnInit loggerService.log:"+this.loggerService.param1);
  }
}
