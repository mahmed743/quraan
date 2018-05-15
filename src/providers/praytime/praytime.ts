import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class PraytimeProvider {

  constructor(public http: HttpClient) {


  }

  getUserIP() {
    return this.http.get('http://ipv4.myexternalip.com/json');
  }

  getUserLocayionInfoByIp(ip) {
    return (ip) ? this.http.get('http://ipinfo.io/' + ip) : null;
  }
  getUserDataFormIp() {
    return this.getUserIP()
    .mergeMap((res: any) => {
      console.log(res);
      return this.getUserLocayionInfoByIp(res.ip)
    })
  }

  getPrayTime(latitude, longitude) {
    let params: HttpParams = new HttpParams();
    if (latitude&&longitude) {
      params = params.append('latitude', latitude);
      params = params.append('longitude', longitude);
      params = params.append('method', '2');
      return this.http.get('http://api.aladhan.com/v1/timings/1398332113',{params} )
    } else {
      return undefined
    }
  }

}
