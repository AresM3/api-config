import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ApiConfiguration, ApiConfigurationParams} from './api-configuration';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [],
    imports     : [],
    exports     : [],
    providers   : [
        ApiConfiguration
    ]
})
export class ApiConfigurationModule {
    static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiConfigurationModule> {
        return {
            ngModule : ApiConfigurationModule,
            providers: [
                {
                    provide : ApiConfiguration,
                    useValue: params
                }
            ]
        };
    }

    constructor(@Optional() @SkipSelf() parentModule: ApiConfigurationModule, @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only');
        }
        if (!http) {
            throw new Error(
                "You need to imort the HttpClientModule in your AppModule! \nSee also https://github.com/angular/angular/issues/20575");
        }
    }
}
