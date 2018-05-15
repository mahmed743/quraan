import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {QuraanProvider} from "../../providers/quraan/quraan";
import { File } from '@ionic-native/file';
import {values} from  'lodash';
import 'rxjs/add/operator/pluck';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-explain',
  templateUrl: 'explain.html',
})
export class ExplainPage {
  verses:any[];
  pageNum: number = 1;
  tafseerName: string = 'Arabic Saddi Tafseer';
  tafseer: string = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quraanProvider: QuraanProvider,
    public documentViewer: DocumentViewer,
    public file: File,
    public platform: Platform,
    public transfer: FileTransfer
  ) {
  }
  ionViewDidLoad() {
    this.getPage();

  }
  openPDF() {
    this.documentViewer.viewDocument('assets/ngcourse2.pdf', 'application/pdf', {title:'pdf file'})

  }

  getPDF() {
    let path: string;
    const transfer = this.transfer.create();
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }
    transfer.download('url', path + 'name.pdf')
      .then(entry => {
        let url = entry.toUrl();
        this.documentViewer.viewDocument(url, 'application/pdf', {});
      })
  }
  getPage(num=1) {
    this.quraanProvider.getPage(num)
      .pluck('quran', 'quran-simple')
      .subscribe(data=>{
        console.log(data,values(data));
        this.verses = values(data).map(verse=>({...verse, selected:false}));
      })
  }
  popPage() {

    this.navCtrl.setRoot('HomePage', {}, {animate:true})
    //this.navCtrl.popToRoot()
  }
  changePage(change) {
    this.getPage(this.pageNum+=change)
  }
  selectVerse(verse) {
    this.verses = values(this.verses).map(ver=>({...ver, selected:ver==verse}));
    console.log('verse =>', verse);
    this.quraanProvider.getTafseer(this.tafseerName, 1, verse.ayah)
      .subscribe((result:any) => {
        console.info(result.tafsirs);
        let verseTafseer = result.tafsirs.find(x => x.resource_name == this.tafseerName);
        this.tafseer = verseTafseer.text;
      })
  }
  trackByFn(index, item) {
    return index; // or item.id
  }

  

}
