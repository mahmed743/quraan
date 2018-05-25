import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import { QuranReader } from '../../pages/recital/recital';

@Injectable()
export class QuraanProvider {
  API_KEY: string = '32373ddb17394217c700e32b253f1066';
  API_URL: string = 'http://api.globalquran.com/';
  headers: HttpHeaders;
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  getPage(pageNum) {
    this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(`${this.API_URL}/page/${pageNum}/quran-simple`, {headers: this.headers,params: new HttpParams().append('key', this.API_KEY)})
  }

  getTafseer(tafseerName, part, verseNumber) {
   console.log('Headers', JSON.stringify(this.headers));
    return this.http.get(`http://staging.quran.com:3000/api/v3/chapters/${part}/verses/${verseNumber}/tafsirs`, { headers: this.headers })
  }

  getQuranRadio() {
    return this.http.get<{ 'Radios': QuranReader[] }>('http://www.mp3quran.net/api/verse/radio_ar.json')
  }
  getQuranReaders() {
    return this.getQuranReaders().filter(radio => radio.Name);
  }
  getReaderAyat(url) {
    return this.http.get(url);
  }

  getSurahNames() {
    return this.http.get<{id:string, name: string}>('https://mp3quran.net/api/_arabic_sura.json')
  }

  searchQuran(searchText: string, lang='ar') {
    return this.http.get(`http://api.alquran.cloud/search/${searchText}/all/${lang}`)
  }
}
