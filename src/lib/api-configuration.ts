import {Injectable} from '@angular/core';

@Injectable({providedIn:'root'})
export class ApiConfiguration{
    rootUrl: string = '';
    client_id: number;
    client_secret: string = '';
}

export interface ApiConfigurationParams{
    rootUrl?: string;
    client_id: number;
    client_secret?:string;
}
