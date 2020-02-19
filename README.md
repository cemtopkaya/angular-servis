Bu servise erişimin en genel olduğu ayardan en kısıtlı olana bakalım:

# providedIn:root
Injectable dekoratörünün providedIn özelliğine 'root' değerini verdiğimizde:
- angular çatısı, DI özelliği sayesinde,
- "default yapıcı metodu varsa" ekstra bir tanımlama gerekmeden
- uygulama seviyesinde her yerden erişilebilir, 
- bir nesneyi yaratıp
kullandırıyor (tavsiye edilen kullanım).
 
Eğer default yapıcı metodu yoksa, yani parametre alan bir yapıcı metodu varsa:
ister tüm uygulamanın modlünde, ister belirl bir modülü veya component tanımının
providers özelliğine yapıcı metodun parametrelerinin alacağı değerleri sağlarız:
@NgModule(  veya @Component(
  providers:[
    // LoggerService
    {provide: 'mandatoryParamIcinTakmaAd', useValue: 'zorunlu param değeri'}, 
    {provide: 'optionalParamIcinTakmaAd', useValue: 'secimli param değeri'}, 
  ]
)

# @NgModule({ providers:[LoggerService] }) > Modül Bazlı
Eğer bir modülün içinde @NgModule({ providers:[LoggerService] }) şeklinde verseydik 
tüm modül içinde geçerli olacak bir instance yaratıp tüm bileşenlere
bu örneğini geçirecek şekilde kullanabilirdik (ki artık tavsiye edilmiyor).
Bu şekilde bir tanımlama ile modül yüklenirken servis nesnesinin yaratılmasına neden olur.
Lazy Loading modüller için aşağıda açıklama 


# app.module İçinde Tüm Modüller İçin Geçerli Kılmak


# @Component({ providers:[LoggerService], ...}) > Bileşen Bazlı
Eğer sadece component'in @Component({ providers:[LoggerService], ...}) özelliğine
yazmış olsaydık o zamanda sadece bu bileşen için LoggerService tipinde bir nesne 
yaratıp DI ile enjecte edecekti.
Eğer modülün providers:[LoggerService] özelliğine ve bileşenin 
providers:[LoggerService] özelliğine atama yapılsaydı, hem modül için bir nesne 
hem bileşen için ayrı bir nesne zerk edecekti.

## Angular Modül Yükleme Türleri
- Eager Loading
- Lazy Loading
- Pre-Loading

### Eager Loading
Varsayılan modül yükleme şekli olup uygulama başlarken modüllerin yüklenmesidir. Küçük boyutlu uygulamalar için kullanılabilir. Tüm modüller uygulama başladığında kullanıma hazırdır.

### Pre-Loading
Orta boyutlu uygulamalar için geçerlidir. Uygulama başladıktan sonra kullanılması beklenen modüllerin yüklenmesini amaçlar.

### Lazy Loading
Uygulama yüklendikten sonra istek gerçekleştiğinde modülün yüklenmesidir. Bu sayede uygulamanın ilk paket boyutu ve yüklenme süresi düşer.

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