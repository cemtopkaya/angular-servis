/**
 * Bu servise erişimin en genel olduğu ayardan en kısıtlı olana bakalım:
 *
 * Injectable dekoratörünün providedIn özelliğine 'root' değerini verdiğimizde:
 * - angular çatısı, DI özelliği sayesinde,
 * - "default yapıcı metodu varsa" ekstra bir tanımlama gerekmeden
 * - uygulama seviyesinde her yerden erişilebilir,
 * - bir nesneyi yaratıp
 * kullandırıyor (tavsiye edilen kullanım).
 *
 * Eğer default yapıcı metodu yoksa, yani parametre alan bir yapıcı metodu varsa:
 * ister tüm uygulamanın modlünde, ister belirl bir modülü veya component tanımının
 * providers özelliğine yapıcı metodun parametrelerinin alacağı değerleri sağlarız:
 * @NgModule(  veya @Component(
 *   providers:[
 *     // LoggerService
 *     {provide: 'mandatoryParamIcinTakmaAd', useValue: 'zorunlu param değeri'},
 *     {provide: 'optionalParamIcinTakmaAd', useValue: 'secimli param değeri'},
 *   ]
 * )
 *
 * Eğer @NgModule({ providers:[LoggerService] }) şeklinde verseydik
 * tüm modül içinde geçerli olacak bir instance yaratıp tüm bileşenlere
 * bu örneğini geçirecek şekilde kullanabilirdik (ki artık tavsiye edilmiyor).
 *
 * Eğer sadece component'in @Component({ providers:[LoggerService], ...}) özelliğine
 * yazmış olsaydık o zamanda sadece bu bileşen için LoggerService tipinde bir nesne
 * yaratıp DI ile enjecte edecekti.
 *
 * Eğer modülün providers:[LoggerService] özelliğine ve bileşenin
 * providers:[LoggerService] özelliğine atama yapılsaydı, hem modül için bir nesne
 * hem bileşen için ayrı bir nesne zerk edecekti.
 */
import { Injectable, Optional, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class LoggerService {
  constructor(
    private httpClient: HttpClient,
    @Inject("mandatoryParamIcinTakmaAd")
    public param1: string,

    @Inject("optionalParamIcinTakmaAd")
    @Optional()
    public param2?: string
  ) {
    this.warn(" *** Logger Service yaratılıyor **** ");

    param2 = param2 || "değer atanmamışsa bu olsun";
    this.log("param1: " + param1);
    this.log("param2: " + param2);
  }

  log(msg: any) {
    console.log("LoggerService.log >" + msg);
  }
  error(msg: any) {
    console.error("LoggerService.error >" + msg);
  }
  warn(msg: any) {
    console.warn("LoggerService.warn >" + msg);
  }
}
