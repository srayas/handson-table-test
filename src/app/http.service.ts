import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient,){}
        getHttp(apiUrl, successFunc, errorFunc) {
            return this.http.get(apiUrl).subscribe(successFunc, errorFunc);
        }

        postHttp(apiUrl, data, successFunc, errorFunc) {
                return this.http.post(apiUrl, data).subscribe(successFunc, errorFunc);
        }
        putHttp(apiUrl, data, successFunc, errorFunc) {
                return this.http.put(apiUrl, data).subscribe(successFunc, errorFunc);
        }
}