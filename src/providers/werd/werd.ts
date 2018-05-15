
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";


@Injectable()
export class WerdProvider {

  constructor(public storage: Storage) {
      //this.storage.clear()
  }

  getStaticWerd () {
    return this.storage.get('static:werds')
  }

  addStaticWerds () {
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

  getPrivateWerd () {

      return this.storage.get('private:werds')
  }

  async addPrivateWerd (werd) {


      let privateWerds = await this.storage.get('private:werds') || [];
      let werdsLength = privateWerds.length;
    if (werd.type == 'ayah') {
      werd.opened = false
    }
    werd.id = werdsLength?(privateWerds[werdsLength-1].id+1):0;
      return this.storage.set('private:werds', [...privateWerds,werd])
  }

  async removePrivateWerd(index) {
    let privateWerds = await this.getPrivateWerd();
    console.log(privateWerds.splice(index, 1), privateWerds);
    return this.storage.set('private:werds', privateWerds)
  }

}
