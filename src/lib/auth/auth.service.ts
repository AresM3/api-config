import {Injectable} from '@angular/core';
import {AuthModel} from './auth.model';

@Injectable({
    providedIn: 'root'
})export class AuthService{
    private accessToken: string = null;
    private refreshToken: string = null;
    private static readonly ACCESS_TOKEN_KEY = 'accessToken';
    private static readonly REFRESH_TOKEN_KEY = 'refreshToken';

    constructor() {}

    cleanToken(){
        this.accessToken = null;
        this.refreshToken = null;
        localStorage.removeItem(AuthService.ACCESS_TOKEN_KEY);
        localStorage.removeItem(AuthService.REFRESH_TOKEN_KEY);
    }

    setToken(auth: AuthModel){
        this.accessToken = auth.accessToken;
        this.refreshToken = auth.refreshToken;
        localStorage.setItem(AuthService.ACCESS_TOKEN_KEY, this.accessToken);
        localStorage.setItem(AuthService.REFRESH_TOKEN_KEY, this.refreshToken);
    }

    isAuthenticated():boolean{
        return !!this.getToken();

    }

    getToken(): string{
        if(this.accessToken != null)
            return this.accessToken;
        else
            return localStorage.getItem(AuthService.ACCESS_TOKEN_KEY) || null;
    }

    getRefreshToken(): string{
        if(this.refreshToken != null)
            return this.refreshToken
        else
            return localStorage.getItem(AuthService.REFRESH_TOKEN_KEY) || null;
    }
}
