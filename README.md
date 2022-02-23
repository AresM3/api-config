# ApiConfig

Questa libreria serve per gestire globalmente in un progetto i dati relativi a delle api di backend, immagazzina
client_id, client_secret e l'url delle api e li rende disponibili nella classe **_ServiceWithConfig_** come proprietà.
Inoltre nel costruttore della classe **_ServiceWithConfig_** vengono istanziati due interceptors per le richieste
**Axios**. Il primo si occupa di inserire nell'header delle richieste l'accessToken se presente, il secondo di
effettuare il logout automatico in caso di errore **401 (Unauthorized)**.

### Come istanziare il modulo?

Per istanziare il modulo bisogna includerlo nell'AppModule e specificare come parametri l'url delle api, il client_id e
il client_secret. È richiesta la presenza dell'**HttpClientModule**

```typescript
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ApiConfigurationModule} from 'dist/api-config/lib/api-configuration.module';

@NgModule({
    imports: [
        HttpClientModule,
        ApiConfigurationModule.forRoot({
            rootUrl      : 'https://apiurl.com',
            client_id    : '1',
            client_secret: 'Aadsac324jkdfh323d2'
        })
    ]
})
export class AppModule {}
```

### Come salvare l'access token?

La libreria @m3team/api-config mette a disposizione il servizio **_AuthService_** (che è incluso nel costruttore del **_
ServiceWithConfig_**) per salvare e accedere all'access token ed al refresh token.

```typescript
import {AuthModel} from 'dist/api-config/lib/auth/auth.model';
import {ServiceWithConfig} from 'dist/api-config/lib/service-with-config';

const TOKEN: AuthModel = {
    accessToken : '231feuihf23uirbh313141hri2uthb2y345rg2yu45g23uy4321uh432b43hu2b32huj423',
    refreshToken: 'adjij3erj2uith4trhb324fh3487ry4tfbn34fgn3487t3h487th348g73h87ty3784tgh3iughb843',
    expires_in  : 300000
}

export class Test extends ServiceWithConfig {
    constructor(config: ApiConfiguration, http: HttpClient, authService: AuthService) {
        super(config, http, authService);
    }

    setToken() {
        this.authService.setToken(TOKEN);
    }
}




```

Agendo in questa maniera ogni servizio che estende il **_ServiceWithConfig_** avrà l'access token inserito nell'header
Authorization.


