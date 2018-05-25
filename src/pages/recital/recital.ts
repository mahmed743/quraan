import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform, Events } from "ionic-angular";
import { QuraanProvider } from "../../providers/quraan/quraan";
import { values, uniqBy } from "lodash";
import "rxjs/add/operator/pluck";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { Brightness } from "@ionic-native/brightness";
import { Verse } from "../explain/explain";
import { ConfigProvider } from "../../providers/config/config";
import { langDir } from "../settings/settings";
import { partsNames } from "../index";

export enum AnimationStateToggle {
  "inactive",
  "active"
}
export interface QuranReader {
  ID: string;
  Name: string;
  URL: string;
  IsCompleted: string;
  TotalAvailable: string;
  BitRate: string;
  Rewaya: string;
  MusshafType: string;
}

@IonicPage()
@Component({
  selector: "page-recital",
  templateUrl: "recital.html",
  animations: [
    trigger("slide", [
      state(
        "inactive",
        style({
          transform: "translateY(-120%)"
        })
      ),
      state(
        "active",
        style({
          transform: "translateY(0)"
        })
      ),
      transition("inactive => active", animate("250ms ease-in")),
      transition("active => inactive", animate("250ms ease-out"))
    ]),
    trigger("show", [
      state(
        "inactive",
        style({
          transform: "translateX(120%)"
        })
      ),
      state(
        "active",
        style({
          transform: "translateX(0)"
        })
      ),
      transition("inactive => active", animate("250ms ease-in")),
      transition("active => inactive", animate("250ms ease-out"))
    ])
  ]
})
export class RecitalPage {
  verses: any[];
  pageNum: number = 1;
  audio: HTMLAudioElement;
  isOn: boolean = false;
  showAudioControls:
    | AnimationStateToggle
    | keyof AnimationStateToggle
    | string = AnimationStateToggle[1];
  clickTime: number = 0;
  brightness: number = 0;
  showBrightnessPanel: boolean = false;
  allReaders: QuranReader[] = [];
  selectedReader: QuranReader;
  defaultSavedReader: string = "شيخ أبو بكر الشاطري";
  _passedTime: number = 0;
  preferences: any = {};
  private selectedVerse: Verse;
  azkarIcon: string = 'ios-moon-outline';
  currentSurahName: string = 'البقرة';
  currentJuzName: string = 'الأول'
  surahsName: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public brightnessNative: Brightness,
    public platform: Platform,
    public quranProvider: QuraanProvider,
    public configProvider: ConfigProvider,
    public events: Events
  ) {
    if (this.navParams.get('initPage')) {

      this.changePage(this.navParams.get('initPage'), true)
    }
  }
  async ionViewWillEnter() {
    this.preferences.showAzkarIcon = (await this.configProvider.getPreferences()).showAzkarIcon;
    let hour = new Date(Date.now()).getHours();
    if (hour < 18 && hour >= 4) {
      this.azkarIcon = 'ios-partly-sunny-outline';
    }
    this.events.subscribe('preference:change', changes => {
      this.preferences = { ...this.preferences, ...changes };
    });

    this.events.subscribe('change:pageByJuz', navData => {
      console.log('change Page Juz', navData);
      this.changePage(navData[1], true);
      this.currentJuzName = navData[2];
    })
  }
  async ionViewDidLoad() {
    // get Quran readers
    this.getQuranRadioReaders();

    // config Page
    if (this.navParams.get("initPage")) {
      this.pageNum = this.navParams.get("initPage");
    }
    if (this.platform.is("cordova")) {
      this.brightness = (await this.brightnessNative.getBrightness()) * 100;
    }
    this.configPage();

    this.events.subscribe('navmenu:changed', () => {
      console.log('ion menu changed');
      this.ionViewWillLeave();
    })
  }
  ionViewWillLeave() {
    this.isOn = false;
    this.audio && this.audio.pause();
  }
  
  configPage() {

    this.configProvider.surasNames
      .then((result: any) => {
        this.surahsName = result;
        //console.log(this.surahsName);
        // Get ayat of Page
        this.getPage();
      });
  }

  private getQuranRadioReaders() {
    this.quranProvider.getQuranRadio().subscribe(data => {
      //console.log(data["Radios"]);
      let radios = uniqBy(data["Radios"], "Name") as QuranReader[];
      radios.pop();
      this.allReaders = radios;
      this.selectedReader = this.allReaders.find(
        reader => reader.Name === this.defaultSavedReader
      );
    });
  }
  private playAudio(url, ayahNumber = this.selectedVerse.ayah, partNumber = this.selectedVerse.surah) {
    let mp3Num = String(Number(partNumber) * 1000 + Number(ayahNumber));
    let ayahUrl = url + mp3Num.padStart(6, "0") + ".mp3";
    console.info("Audio Url", ayahUrl);
    // TODO: show playing loader
    try {
      if (!this.audio) {
        this.audio = new Audio(ayahUrl);
        this.audio.preload = 'none';
        document.body.appendChild(this.audio);

        this.audio.addEventListener("ended", () => {
          console.log('audio ended');
          this.getNextAyah(this.selectedReader.URL);

        });
      } else {
        this.audio.load();
        this.audio.src = ayahUrl;
      }
      this.isOn = true;
      this.audio.play().then(
        () => {
          //TODO: remove playing loader UI
        },
        err => {
          console.warn(err);
        }
      );

    } catch (err) {
      console.warn(err);
      // partNumber++;
      // this.playAudio(url, ayahNumber, partNumber);
    }
  }

  getPassedTime() {
    this._passedTime = (this.audio.currentTime / this.audio.duration) * 100;
    console.log('passed Time', this._passedTime);

  }
  getNextAyah(url) {
    try {
      let index = this.verses.findIndex(verse=>verse.verse == this.selectedVerse.verse);
      this.selectedVerse = this.verses[index + 1];
      if (this.selectedVerse !== undefined) {
        console.log('findedIndex', index, 'selected Verse', this.selectedVerse);
        this.verses[index].selected = false;
        this.verses[index + 1].selected = true;
        this.playAudio(url);
      } else  {
        this.changePage(1)
      }
    } catch (e) {
      console.log(e)
    }
  }

  changeReader(reader: QuranReader) {
    this.selectedReader = reader;
    console.info("selected Reader: ", reader, this.selectedReader);
    this.playAudio(reader.URL);
  }

  changePlayState() {
    this.isOn = !this.isOn;
    if (!this.selectedReader) {
      this.selectedReader = this.allReaders.find(
        reader => reader.Name === this.defaultSavedReader
      );
    }
    if (!this.audio) {
      this.playAudio(this.selectedReader.URL);
    }
    if (this.isOn) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  rewind(dir) {
    if (this.audio) {
      this.audio.currentTime += 10 * dir;
    }
  }

  getPage(num = 1) {
    this.quranProvider.getPage(num)
      .subscribe(
        data => {
          this.verses = values(data).map((verse, index) => ({
            ...verse,
            selected: index == 0
          }));
          // make the first verse the selected one
          this.selectedVerse = this.verses[0];
          this.currentSurahName = this.surahsName.find(surah => this.selectedVerse.surah == surah.id)['name'];

          // play audio on it
          if (num > 1)
            this.playAudio(this.selectedReader.URL)
        },
        err => {
          console.log("error getting page", JSON.stringify(err));
        }
      );
  }
  popPage() {
    this.navCtrl.setRoot("HomePage", {}, { animate: true });
    //this.navCtrl.popToRoot()
  }
  changePage(change, exact?:boolean) {
    //this.pageNum += change;
    this.getPage((this.pageNum = exact?change:this.pageNum+change));
    this.detectJuz()
  }

  private detectJuz() {
    const juzPageNumbers = this.configProvider.JuzPageNumbers;
    const index = juzPageNumbers.findIndex(juz => this.pageNum < juz[1]);
    this.currentJuzName = partsNames[juzPageNumbers[index - 1][0]];

    console.log('currect juz number', this.currentJuzName, juzPageNumbers[index - 1][0] )
  }
  selectVerse(verse) {
    this.verses = values(this.verses).map(ver => ({
      ...ver,
      selected: ver.verse == verse.verse
    }));
    //console.log(this.verses);
    if (verse.id !== this.selectedVerse.id) {
      this.selectedVerse = verse;
      this.showAudioControls = "active";
      console.log("verse =>", verse);
      this.playAudio(
        this.selectedReader.URL,
        this.selectedVerse.ayah,
        this.selectedVerse.surah
      );
      //this.getTafseer(this.tafseerName)
    }
  }
  trackByFn(index, item) {
    return index; // or item.id
  }

  toggleAudioCtrl() {
    console.log(this.showAudioControls);
    this.showAudioControls =
      this.showAudioControls == AnimationStateToggle[1]
        ? AnimationStateToggle[AnimationStateToggle.inactive]
        : AnimationStateToggle[AnimationStateToggle.active];
    console.log(this.showAudioControls);
  }
  contentSwipe(event) {
    console.log(event, event.direction);
    if (event.direction === 1 || event.direction === 4) {
      this.changePage(1);
      console.info("left to right");
    } else if (event.direction === 2) {
      this.changePage(-1);
      console.info("right to left");
    }
  }
  brightChange(event: any) {
    console.log(event);
    this.brightnessNative.setBrightness(event / 10);
  }
  surahClicked() {
    if (this.clickTime == 0) {
      this.clickTime = +Date.now();
    } else {
      if (+Date.now() - this.clickTime < 800) {
        this.toggleAudioCtrl();
        this.showBrightnessPanel = false;
      }
      this.clickTime = 0;
    }
  }

  goTo(page: string) {
    this.navCtrl.push(page, { lang: langDir[this.platform.dir()] })
  }
}
