
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import {QuraanProvider} from "../quraan/quraan";
import {ConfigProvider} from "../config/config";
import {Events} from "ionic-angular";

export interface UserDailyWerd {
  id: number,
  read: boolean,
  partsNumber: number|string,
  added: string|any,
  readDate?: null|string,
  location: {
    page: number,
    from: any[],
    to: any[],
    verse?:string
  }|any
}

export enum ArPartsNumber {
  'وجه واحد' = 1,
    'وجهان',
  'ثلاث أوجه',
  'أربع أوجه'
}
@Injectable()
export class WerdProvider {

  constructor(public storage: Storage, public quranProvider: QuraanProvider, public configProvider: ConfigProvider, public events: Events) {
    //this.storage.clear()
    this.events.subscribe('user:readPart', (pageNumber)=>{
      this.setUserWerdProperty('read', true, pageNumber)
        .then(data=>{
          console.log('saved..', data);
        })

    })
  }

  getStaticWerd() {
    return this.storage.get('static:werds')
  }

  addStaticWerds() {
    return this.storage.set('static:werds', [{
      name: 'اية الكرسى',
      type: 'ayah',
      opened: true,
      text: 'اللَّهُ لاَ إِلَٰهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيم'
    }, {
      name: 'قراءة اخر ايتين من سورة البقرة',
      type: 'ayah',
      opened: true,
      text: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللّهِ وَمَلآئِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لاَ نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ وَقَالُواْ سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ يُكَلِّفُ اللّهُ نَفْساً إِلاَّ وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لاَ تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلاَ تَحْمِلْ عَلَيْنَا إِصْراً كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا رَبَّنَا وَلاَ تُحَمِّلْنَا مَا لاَ طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنتَ مَوْلاَنَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِين'
    }, {
      name: 'قول لا حول ولا قوة الا بالله العلى العظيم',
      type: 'doaa'
    }, {
      name: 'قول بسم الله توكلنا على الله',
      type: 'doaa'
    }, {
      name: 'قول أعوذ بكلمات الله التامات من شر ما خلق',
      type: 'doaa'
    }])
  }



  getPrivateWerd() {
    return this.storage.get('private:werds')
  }

  async getUserPrivateWerds(datastore:any[] = []) {
    const [userPreferences, userPrivateWerds ]= await Promise.all([this.storage.get('user:preferences'), this.storage.get('user:privateWerds')]);
    if(!userPrivateWerds||datastore.length) {
      let werds: UserDailyWerd[] = [...datastore];
      let storedWerdsAfterAssign: any[];
      console.info('user preferences', Array(userPreferences.partsNumber));
      Array(userPreferences.partsNumber - werds.length).fill(userPreferences.partsNumber).forEach(async (p, i, arr)=> {
        
        werds.push({
          id: 0,
          read: false,
          partsNumber: ArPartsNumber[userPreferences.partsNumber],
          added: new Date(Date.now()),
          readDate: null,
          location: await this.getPageLocations(datastore.length ? userPrivateWerds[userPrivateWerds.length-1].location.page+1:i+1)
        });
        //werds[i].location = await this.getPageLocations(i+1);
        console.log(werds[i]);
        storedWerdsAfterAssign = await this.storage.set('user:privateWerds', Array.from(new Set([...werds, werds[i]])));
        console.log('saved Werds after assign', storedWerdsAfterAssign);
      });
      return this.storage.get('user:privateWerds')

    } else {
      userPrivateWerds[0].partsNumber = ArPartsNumber[userPreferences.partsNumber];
      return this.storage.set('user:privateWerds', userPrivateWerds)
      /*let [privateWerdsNumber, partsNumber] = [ArPartsNumber[userPrivateWerds[userPrivateWerds.length-1].partsNumber], userPreferences.partsNumber]
      console.log(privateWerdsNumber, partsNumber);
      if (privateWerdsNumber == partsNumber) {
        console.warn('same daily parts');
        return userPrivateWerds
      } else {
        //this.storage.set()
        console.warn('daily parts changes');
        if (partsNumber < privateWerdsNumber) {
          return userPrivateWerds.slice(0, partsNumber);
        } else {
          return this.getUserPrivateWerds(userPrivateWerds);
        }
        
      }*/
    }

  }

  private async getPageLocations(pageNumber, read?:boolean) {
    let location: any = {page: pageNumber, verse: ''};
    let pageData: any = await this.quranProvider.getPage(pageNumber).toPromise();
    console.log('pageInfo', pageData);
    let ayatNums = Object.keys(pageData);
    location.from = [pageData[ayatNums[0]].surah, pageData[ayatNums[0]].ayah];
    location.to = [pageData[ayatNums[ayatNums.length - 1]].surah, pageData[ayatNums[ayatNums.length - 1]].ayah];
    let surahNames = await this.configProvider.surasNames;
    //console.log('suraz names', surahNames, location, 'ayatNum', ayatNums);
    location.from[2] = surahNames.find(surah => location.from[0] == surah.id)['name'];
    location.to[2] = surahNames.find(surah => location.to[0] == surah.id)['name'];
    for (let key in ayatNums) {
      if (Number(key) < 4) {
        location.verse += pageData[ayatNums[key]].verse+' [ '+((pageNumber==1)?ayatNums[key]:(Number(ayatNums[key])-7))+' ] ';
      }
    }
    read&&(location.page+=1);
    return location
  }

  async setUserWerdProperty(prop, value, pageNumber?:any) {

        let werds = await  this.getUserPrivateWerds();
        let werd = werds[0];
        console.log('saved werd', werds, werds);
        if (prop === 'read') {
          console.info('werd location', werd.location);
          werd.location = await this.getPageLocations(Number(pageNumber)+1);
        }
        return this.storage.set('user:privateWerds', [{...werd, ...{[prop]:value}}]);

  }
  async addPrivateWerd(werd) {


    let privateWerds = await this.storage.get('private:werds') || [];
    let werdsLength = privateWerds.length;
    if (werd.type == 'ayah') {
      werd.opened = false
    }
    werd.id = werdsLength ? (privateWerds[werdsLength - 1].id + 1) : 0;
    return this.storage.set('private:werds', [...privateWerds, werd])
  }

  async removePrivateWerd(index) {
    let privateWerds = await this.getPrivateWerd();
    console.log(privateWerds.splice(index, 1), privateWerds);
    return this.storage.set('private:werds', privateWerds)
  }

}
