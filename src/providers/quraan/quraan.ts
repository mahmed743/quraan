import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';

@Injectable()
export class QuraanProvider {
  API_KEY: string = '32373ddb17394217c700e32b253f1066';
  API_URL: string = 'http://api.globalquran.com/';
  constructor(public http: HttpClient) {
  }

  getPage(pageNum) {
    return this.http.get(`${this.API_URL}/page/${pageNum}/quran-simple`, {params: new HttpParams().append('key', this.API_KEY)})
  }

  getTafseer(tafseerName, part, verseNumber) {
    return this.http.get(`http://staging.quran.com:3000/api/v3/chapters/${part}/verses/${verseNumber}/tafsirs`)
  }
}
