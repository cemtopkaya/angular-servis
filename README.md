# Servisler
- Servisler uygulama/modül/bileşen özelinde çalışabilir.
- Servisleri içeren modüllerden EXPORT edilmezler!
- Servislerin içerdiği metotları typescript compiler bilmesi gerektiği için kullanıldığı yere import edilirler.

## Uygulama Özelinde Zerk Edilen Servisler

Bu servise erişimin en genel olduğu ayardan en kısıtlı olana bakalım:

#### providedIn:root
Injectable dekoratörünün providedIn özelliğine 'root' değerini verdiğimizde:
- angular çatısı, DI özelliği sayesinde,
- "default yapıcı metodu varsa" ekstra bir tanımlama gerekmeden
- uygulama seviyesinde her yerden erişilebilir, 
- bir nesneyi yaratıp
kullandırıyor (tavsiye edilen kullanım).
 
Eğer default yapıcı metodu yoksa, yani parametre alan bir yapıcı metodu varsa:
```
@Injectable({ providedIn: 'root'})
export class LoggerService {

  constructor(
    private httpClient: HttpClient,
    @Inject('mandatoryParamIcinTakmaAd') param1:string,
    @Inject('optionalParamIcinTakmaAd') @Optional() param2?:string,
    ) { ...
```

İster tüm uygulamanın modülünde, ister belirli bir modül veya component tanımının
providers özelliğinde yapıcı metodun parametrelerinin alacağı değerleri sağlarız:
```
@NgModule(  veya @Component(
  providers:[
    // LoggerService  // {providedIn: 'root'} olduğu için burada belirtmeye gerek yok
    {provide: 'mandatoryParamIcinTakmaAd', useValue: 'app.module içinde set edilen zorunlu param değeri'}, 
    {provide: 'optionalParamIcinTakmaAd', useValue: 'app.module içinde set edilen secimli param değeri'}, 
  ]
)
```

## Modül Özelinde Zerk Edilen Servisler
Eğer bir servis  { providedIn: 'root'} ile zerk edilmiyor, bir modülün içinde 
@NgModule({ providers:[LoggerService] }) şeklinde veriliyorsa 
tüm modül içinde geçerli olacak bir instance yaratıp tüm bileşenlere
bu örneğini geçirecek şekilde kullanılabilinir (ki artık tavsiye edilmiyor).
Bu şekilde bir tanımlama ile modül yüklenirken servis nesnesinin yaratılmasına neden olur.

*Not: Lazy Loading modüller için aşağıda açıklama mevcut.*


### app.module İçinde Tüm Modüller İçin Geçerli Kılmak
Bir modül için yapılabilecek tanımlamayı tüm modüller için geçerli kılmanın diğer yoluda 
uygulama modülü içinde ilgili servisi providers:[LoggerService] dizisine eklemektir.


# @Component({ providers:[LoggerService], ...}) > Bileşen Bazlı
- Eğer sadece component'in *@Component({ providers:[LoggerService], ...})* özelliğine
yazmış olsaydık o zamanda sadece bu bileşen için LoggerService tipinde bir nesne yaratıp DI ile enjecte edecekti.

- Eğer modülün ve bileşenin *providers:[LoggerService]* özelliğine atama yapılsaydı, hem modül için bir nesne 
hem bileşen için ayrı bir nesne zerk edecekti.

# Angular Modül Yükleme Türleri
- **Eager Loading**, varsayılan modül yükleme şekli olup uygulama başlarken modüllerin yüklenmesidir. Küçük boyutlu uygulamalar için kullanılabilir. Tüm modüller uygulama başladığında kullanıma hazırdır.
- **Lazy Loading**, uygulama yüklendikten sonra istek gerçekleştiğinde modülün yüklenmesidir. Bu sayede uygulamanın ilk paket boyutu ve yüklenme süresi düşer.
- **Pre-Loading**, orta ölçekte uygulamalar için geçerlidir. Uygulama başladıktan sonra kullanılması beklenen modüllerin yüklenmesini amaçlar.



## Lazy Loading Modül
* Ana modülünüz app.module.ts olsun. 
* Siparişleri görüntülemek/değiştirmek/eklemek/silmek için bir component kümeniz olsun. Bu kümeyle ilgili rota/modül/servis yönetimi için siparis.modul.ts dosyasını oluşturalım.
* Siparişlerin rotalanması için siparis-routing.module.ts dosyasını oluşturalım
```
// siparis-routing.module.ts
const routes: Routes = [
  {
    path: '', component: SiparislerComponent, 
    loadChildren:[
      {path: '', redirectTo: 'yeni', pathMatch: 'full'},
      {path: 'yeni', component: SiparisOlusturComponent},
      {path: 'detay', component: SiparisComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class SiparisRoutingModule { }
```

```
// siparis.module.ts
import { SiparisRoutingModule } from './siparis-routing.module';
@NgModule({
  declarations: [
    SiparislerComponent,
    SiparisOlusturComponent, 
    SiparisComponent
  ],
  imports: [
    CommonModule,
    SiparisRoutingModule
  ]
})
export class SiparisModule { }
```

```
// app-routing.module.ts
const routes: Routes = [
  {path: '', redirectTo: 'eager-loading', pathMatch: 'full'},
  {path: 'eager-loading', component: EagerHomeComponent, 
    children: [
      {path: '', redirectTo: 'child1', pathMatch: 'full'},
      {path: 'child1', component: EagerChild1Component},
      {path: 'child2', component: EagerChild2Component},
      {path: '**', redirectTo: 'child1'}
    ]
  },
  {
    path: 'lazy-loading',
    loadChildren: './features/siparis/siparis.module#SiparisModule'
   },
  {path: '**', redirectTo: 'eager-loading'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

eager-loading için kullandığımız children yerine lazy loading için [loadChildren](https://angular.io/api/router/Route#lazy-loading) kullanıyoruz.

Tembel yüklenen rotaların kök uygulama modülünün dışında olması gerekir, bu nedenle tembel yüklenen özelliklerin (sipariş feature gibi) kendilerine has modüllere sahip olmasını istersiniz. Böylece uygun path için ilgili modüle loadChildren ile bağlantı verebilesiniz. 

Eğer uygulama modülünüzde, tembel olarak yüklenmesi gereken bileşenleri içe aktarırsanız (app.module içinde imports:[SiparisComponent, SiparisDetayComponent... gibi]) eager loading yapmış olursunuz. Oysa lazy loading stratejisinde ilgili bileşenler kullanıldığında yüklenmesini istediğimiz için ön yüklemenin gerçekleşmesini istemeyiz. 

### Referanslar
[Eager-Pre-Lazy Loading](https://medium.com/@lifei.8886196/eager-loading-lazy-loading-and-pre-loading-in-angular-2-what-when-and-how-798bd107090c)