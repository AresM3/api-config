import {ApiConfiguration} from './api-configuration';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import axios from 'axios';

export class ServiceWithConfig {
    constructor(protected config: ApiConfiguration, protected http: HttpClient, protected authService: AuthService) {
        axios.interceptors.request.use(config => {
            if (authService) {
                config.headers.authorization = `Bearer ${authService.getToken()}`;
            }
            return config;
        });
        axios.interceptors.response.use(
            r => r,
            error => {
                if(error.response.status == 401){
                    this.authService.cleanToken();
                }
                return Promise.reject();
            }
        );
    }

    private _rootUrl: string = '';
    private _clientId: number;
    private _clientSecret: string = '';

    get rootUrl(): string {
        return this._rootUrl || this.config.rootUrl;
    }

    set rootUrl(rootUrl: string) {
        this._rootUrl = rootUrl;
    }

    get clientId(): number {
        return this._clientId || this.config.client_id;
    }

    set clientId(clientId: number) {
        this._clientId = clientId;
    }

    get clientSecret(): string {
        return this._clientSecret || this.config.client_secret;
    }

    set clientSecret(clientSecret: string) {
        this._clientSecret = clientSecret;
    }
}
