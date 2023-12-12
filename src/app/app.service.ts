import { Injectable } from "@angular/core"
import { HttpService } from "./http.service"

@Injectable()

export class AppService {
    constructor(private httpService: HttpService){}

gethttp(url,successFn, errorFn){
    return this.httpService.getHttp(url,successFn,errorFn)
  } 
  post(api,params, successFn, errorFn) {
    return this.httpService.postHttp(api, params, successFn, errorFn);
}
putHttp(api,obj,successFn,errorFn){
    this.httpService.putHttp(api,obj,successFn,errorFn);
  }
}