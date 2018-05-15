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
    this.documentViewer.viewDocument('assets/standard1-quran.pdf', 'application/pdf', {title:'pdf file'})

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

  }
  trackByFn(index, item) {
    return index; // or item.id
  }

}
