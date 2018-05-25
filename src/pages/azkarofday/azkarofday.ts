import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import { AzkarproviderProvider } from "../../providers/azkarprovider/azkarprovider";
import {
  trigger,
  style,
  animate,
  transition,
  state
} from "@angular/animations";
enum ZekrTypeData {
  "Azkar of Morning" = "getMorningAzkar",
  "Azkar of Night" = "getNightAzkar"
}
const animationTimeOut: number = 200;
@IonicPage()
@Component({
  selector: "page-azkarofday",
  templateUrl: "azkarofday.html",
  animations: [
    trigger("countChange", [
      state(
        "zoom-in",
        style({
          transform: "scale(1.4)",
          opacity: 0
        })
      ),

      state(
        "zoom-out",
        style({
          transform: "scale(1)"
        })
      ),

      transition("zoom-out => zoom-in", animate("100ms ease-in")),
      transition("zoom-in => zoom-out", animate("100ms ease-out"))
    ]),
    trigger("decrease", [
      state(
        "inactive",
        style({
          "box-shadow": "0 0 0 0 green"
        })
      ),
      state(
        "active",
        style({
          "box-shadow": "0 0 0 6px  #0c787a"
        })
      ),

      transition(
        "inactive => active",
        animate(`${animationTimeOut}ms ease-in`)
      ),
      transition(
        "active => inactive",
        animate(`${animationTimeOut}ms ease-out`)
      )
    ])
  ]
})
export class AzkarofdayPage implements AfterViewInit {
  @ViewChild(Slides) azkarSlides: Slides;
  azkarType: string = "Azkar of Morning";
  appLang: string = "ar";
  azkars: any[] = [];
  slideDragged: boolean = false;
  countChanged: string = "zoom-out";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public azkarsProvider: AzkarproviderProvider
  ) {
    this.appLang = this.navParams.get("lang");
  }
  ngAfterViewInit() {
    this.azkarSlides.lockSwipes(true);
  }

  ionViewDidLoad() {
    let dateNow = new Date(Date.now());
    let hour = dateNow.getHours();
    if (hour >= 18 || hour < 4) {
      this.azkarType = "Azkar of Night";
    }
    this.getPageAzkar();
  }

  private getPageAzkar() {
    console.log(this.azkarType, ZekrTypeData[this.azkarType]);
    this.azkars = this.azkarsProvider[ZekrTypeData[this.azkarType]].map(
      (zekr, index) => {
        zekr.text = this.formatZekr(zekr.text);
        zekr.state = "inactive";
        zekr.id = index
        //console.log(this.formatZekr(zekr.text));
        return zekr;
      }
    );
  }

  private formatZekr(text) {
    return text.replace(
      /اللَّهُ|ٱللَّهُ|اللّهُ|ٱللَّهـمَُّ|لله|اللّهـمَّ/g,
      '<span class="holy">$&</span>'
    ).replace(/\[.+\]/g, '<span class="ayah-ref">$&</span>')
  }

  readNext(zekr, lockSlide: boolean = false) {

    if (zekr.repeat < 2) {
      this.azkarSlides.slideNext(500);
      setTimeout(() => {
        this.azkars = this.azkars.filter(z => z != zekr);
        this.azkarSlides.slidePrev(0)
      }, 100);
      this.azkarSlides.lockSwipes(false);
    } else {
      lockSlide && this.azkarSlides.lockSwipes(true);
      zekr.repeat--;
      this.toggleState("state", ["inactive", "active"], zekr);
    }
    this.azkarsProvider.zekrReaded();
    this.toggleState("countChanged", ["zoom-out", "zoom-in"]);
    this.azkarSlides.lockSwipes(false);
  }

  private toggleState(prop: string, stats: string[], parent = this) {
    parent[prop] = parent[prop] === stats[0] ? stats[1] : stats[0];
    setTimeout(() => {
      parent[prop] = parent[prop] === stats[0] ? stats[1] : stats[0];
    }, animationTimeOut);
  }

  emitSlideDrag() {
    if (!this.slideDragged) {
      this.slideDragged = true;
      setTimeout(() => {
        let slideIndex = this.azkarSlides._activeIndex;
        let zekr = this.azkars[slideIndex - 1];
        this.readNext(zekr, true);
        this.slideDragged = false;
      }, 300);
    }
  }
}
