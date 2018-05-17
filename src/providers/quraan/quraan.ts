import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';

@Injectable()
export class QuraanProvider {
  API_KEY: string = '32373ddb17394217c700e32b253f1066';
  API_URL: string = 'http://api.globalquran.com/';
  headers: HttpHeaders;
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  getPage(pageNum) {
    
    return this.http.get(`${this.API_URL}/page/${pageNum}/quran-simple`, {headers: this.headers,params: new HttpParams().append('key', this.API_KEY)})
  }

  getTafseer(tafseerName, part, verseNumber) {
   console.log('Headers', JSON.stringify(this.headers));
    return this.http.get(`http://staging.quran.com:3000/api/v3/chapters/${part}/verses/${verseNumber}/tafsirs`, { headers: this.headers })
  }
}
