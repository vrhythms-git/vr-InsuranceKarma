import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";
import { IKServices } from "../services/app.service";
import * as $ from "jquery";
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-insurance-tiles',
  templateUrl: './insurance-tiles.component.html',
  styleUrls: ['./insurance-tiles.component.css'],
  animations: [
    trigger('slideInOutLife', [
      state('expandLifeCard', style({
        // height: '290px',
        // width: '88.5%'
        height: '*',
        width: '*'
      })),
      state('collapseLifeCard', style({
        height: '0px',
        width: '0px'
      })),
      transition('expandLifeCard => collapseLifeCard', animate('1000ms')),// ease-in-out')),
      transition('collapseLifeCard => expandLifeCard', animate('1000ms')) // ease-in-out'))
    ]),
    trigger('slideInOutHome', [
      state('expandHomeCard', style({
        height: '*',
        width: '*'
      })),
      state('collapseHomeCard', style({
        height: '0px',
        width: '0px'
      })),
      transition('expandHomeCard => collapseHomeCard', animate('1000ms')),// ease-in-out')),
      transition('collapseHomeCard => expandHomeCard', animate('1000ms')) // ease-in-out'))
    ]),
    trigger('slideInOutCar', [
      state('expandCarCard', style({
        height: '*',
        width: '*'
      })),
      state('collapseCarCard', style({
        height: '0px',
        width: '0px'
      })),
      transition('expandCarCard => collapseCarCard', animate('1000ms')),// ease-in-out')),
      transition('collapseCarCard => expandCarCard', animate('1000ms')) // ease-in-out'))
    ])
  ]
})
export class InsuranceTilesComponent implements OnInit {

  stateData$: Observable<any>;
  InsuranceData: any;
  SliderData: any = {};
  insuranceType: any;
  homedivId: any;
  lifedivId: any;
  autodivId: any;
  hideHomeCard: boolean = true;
  showHomeCard: boolean = false;
  hideLifeCard: boolean = true;
  showLifeCard: boolean = false;
  hideAutoCard: boolean = true;
  showAutoCard: boolean = false;

  hidePetCard: boolean = false;
  hideBoatCard: boolean = false;
  hideRentCard: boolean = false;
  HiddenMatCardHome: boolean = true;
  HiddenMatCardLife: boolean = true;
  HiddenMatCardCar: boolean = true;
  isCardOpened: boolean = false;
  mode: string;
  toggleSlideLife: boolean = true;
  toggleSlideHome: boolean = true;
  toggleSlideAuto: boolean = true;
  @ViewChild("home") home: ElementRef;

  isAPICallComplete: boolean = false;
  showLoadingAnimation: boolean = false;

  // formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 2
  // })

  yrofLastrenovation = '2020';
  claimsinLastyears = '0';
  plumingCondition = 'Average';
  roofCondition = 'Average';
  burglerAlarm: boolean = false;
  floodInsurance: boolean = false;

  lifehiddenfields: boolean = true;
  homehiddenfields: boolean = true;
  autohiddenfields: boolean = true;

  yearAuto = '2020';
  MakeAndModel = 'Hyundai 2020';
  typeOfPolicyAuto = 'Policy 1';
  additionalDriver = 'Driver 1';

  sliderVariableValues = {

    dwelling: 100000,
    dwelling_min: 100000,
    dwelling_max: 500000,

    otherStructure_min: 10000,
    otherStructure: 10000,
    otherStructure_max: 10000,

    personalProperty_min: 210000,
    personalProperty: 210000,
    personalProperty_max: 210000,

    lossOfUse_min: 10000,
    lossOfUse: 10000,
    lossOfUse_max: 10000,

    personalLiability_min: 100000,
    personalLiability: 100000,
    personalLiability_max: 100000,

    medical_min: 2000,
    medical: 2000,
    medical_max: 2000
  }

  sliderAutoVariableValues = {

    bodilyInjuryLability_min: 25000,
    bodilyInjuryLability: 25000,
    bodilyInjuryLability_max: 100000,

    propertyDamageLiability_min: 25000,
    propertyDamageLiability: 25000,
    propertyDamageLiability_max: 100000,

    comprehensiveAndCollision_min: 250,
    comprehensiveAndCollision: 250,
    comprehensiveAndCollision_max: 1000,

    personalInjuryProtection_min: 2000,
    personalInjuryProtection: 2000,
    personalInjuryProtection_max: 7000,

    uninsuredOrUnderinsuredMotorist_min: 0,
    uninsuredOrUnderinsuredMotorist: 0,
    uninsuredOrUnderinsuredMotorist_max: 300000,

    yearlymiles: 10000
  }


  sliderLifeVariableValues = {

    deathBenefit: 250000,
    currentDebit: 180000,
    childEducationFund: 50000,
    funeralSpend: 2500,
    retirementAge: 50,
    annualIncome: 50000,
    replacementIncome: 5

  }

  constructor(private store: Store<UserData>, private ikservice: IKServices, private snackBar: MatSnackBar) {

    // this.stateData$ =  this.store.pipe(select(CounterSelector.selectUserData))
    //(this.stateData$ = storeData));
  }

  // stateData : Observable;

  isStateDataSet = false;
  showMask: boolean = false;
  showUploadPolicyPopup: boolean = true;

  getBorderColorBasedOnRiskLevel(risk) {

    if (risk == "high")
      return "border-color: rgb(218 68 83)!important;";
    if (risk == "low")
      return "border-color: #69913e!important;"
    if (risk == "medium")
      return "border-color: #ffce54!important;"
  }

  getBackgroundColorBasedOnRiskLevel(risk) {


    if (risk == "high")
      return "background-color: rgb(218 68 83)!important;";
    if (risk == "low")
      return "background-color: #69913e!important;"
    if (risk == "medium")
      return "background-color: #ffce54!important;"

  }

  burgleralarm(event) {
    this.burglerAlarm = event.checked
  }

  showHideInsights(risk) {
    // console.log('showHideInsights :: ' + risk)
    if (risk == "" || risk == undefined) {
      return true;
    } else {
      if (this.showMask == false) {
        $("#mask").fadeTo(500, 0.25);
        this.showMask = false;
      }
      return false;
    }
  }

  getImageToShowBasedOnRisk(risk) {

    if (risk == undefined || risk == "") {
      return ""
    } else {
      if (this.showMask == false) {
        $("#mask").fadeTo(500, 0.25);
        this.showMask = false;
      }
      return `/assets/${risk}.png`
    }
  }

  isFlagSet = false;
  closePopupEvent({ type, event }) {
    this.isFlagSet = false;
    // setTimeout(()=>{
    //$("#mask").hide()
    // },100)

    this.showMask = true;
    let subscribed = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
      if (this.isFlagSet == false) {
        this.isFlagSet = true;
        let currStateData = JSON.parse(JSON.stringify(data));
        let index = currStateData.cards.findIndex(obj => obj.key == type)
        currStateData.cards[index].showRiskModel = true;
        this.store.dispatch(actions.updateUserDataAct({ data: currStateData }));
      }
    })
    subscribed.unsubscribe()

  }

  isDataAvailable = false;

  tempFlag4 = false;

  ngOnInit(): void {

    //this.tempFlag4 = false;
    // setTimeout(()=>{
    this.store.pipe(select(CounterSelector.selectUserData)).subscribe(storeData => {

      if (storeData != undefined && storeData != {})
        this.stateData$ = storeData
      this.isDataAvailable = true;
      //this.stateData$ =  JSON.parse(JSON.stringify(storeData))

    }

    );
    //},100)
    $(document.getElementsByClassName("petIns")).addClass("col-md-4 fourth inactiveGrey");
    $(document.getElementsByClassName("boatIns")).addClass("col-md-4 fifth inactiveGrey");
    $(document.getElementsByClassName("rentIns")).addClass("col-md-4 sixth inactiveGrey");
    this.mode = "collapseHomeCard";
    this.mode = "collapseLifeCard";
    this.mode = "collapseCarCard";
    this.homedivId = $(document.getElementById('homeInsurance'));
    this.lifedivId = $(document.getElementById('lifeInsurance'));
    this.autodivId = $(document.getElementById('autoInsurance'));


    this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

      // this.stateData = data
      if (data != undefined && data != {}) {

        if (data.hasStateChanged == "true") {
          this.tempFlag4 = false
          $(document.getElementsByClassName("homeIndBtnCls")).removeClass("changeBgColor");
          // $(document.getElementsByClassName("lifeIndBtnCls")).removeClass("changeBgColor");
          $(document.getElementsByClassName("autoIndBtnCls")).removeClass("changeBgColor");
          this.homehiddenfields = true;
          this.autohiddenfields = true;
        }

        if (this.tempFlag4 == false) {
          let index = data.cards.findIndex(obj => obj.key == 'home')
          let dwelling_default = data.default_home_dwelling
          this.sliderVariableValues.dwelling_min = dwelling_default,
            this.sliderVariableValues.dwelling = dwelling_default,
            this.sliderVariableValues.dwelling_max = dwelling_default + 500000,

            this.sliderVariableValues.otherStructure_min = (parseInt(dwelling_default) * 0.10)
          this.sliderVariableValues.otherStructure = (parseInt(dwelling_default) * 0.10)
          this.sliderVariableValues.otherStructure_max = (parseInt(dwelling_default) * 0.10) + 50000

          this.sliderVariableValues.personalProperty_min = (parseInt(dwelling_default) * 0.70)
          this.sliderVariableValues.personalProperty = (parseInt(dwelling_default) * 0.70)
          this.sliderVariableValues.personalProperty_max = (parseInt(dwelling_default) * 0.70) + 100000

          this.sliderVariableValues.lossOfUse_min = (parseInt(dwelling_default) * 0.20)
          this.sliderVariableValues.lossOfUse = (parseInt(dwelling_default) * 0.20)
          this.sliderVariableValues.lossOfUse_max = (parseInt(dwelling_default) * 0.20) + 50000

          this.sliderVariableValues.personalLiability_min = dwelling_default
          this.sliderVariableValues.personalLiability = dwelling_default
          this.sliderVariableValues.personalLiability_max = dwelling_default + 500000

          this.sliderVariableValues.medical_min = 2000
          this.sliderVariableValues.medical = 2000
          this.sliderVariableValues.medical_max = 7000
          //  this.tempFlag4 = true; 
          //console.log("Calculated data is : " + JSON.stringify(this.sliderVariableValues));
        }

        if (data.hasStateChanged == "true") {
          console.log("hasStateChanged:" + data.hasStateChanged);

          this.SliderData.dwelling = this.sliderVariableValues.dwelling_min
          this.SliderData.otherStructure = this.sliderVariableValues.otherStructure_min
          this.SliderData.personalProperty = this.sliderVariableValues.personalProperty_min
          this.SliderData.lossOfUse = this.sliderVariableValues.lossOfUse_min
          this.SliderData.personalLiability = this.sliderVariableValues.personalLiability_min
          this.SliderData.medical = this.sliderVariableValues.medical_min
        }
      }
    });
  }

  onFloodInsuranceToggle(event) {
    this.floodInsurance = event.checked
  }

  getChangeFormattedText(percentage, value) {

    if (percentage == 0)
      return "";
    // return "--no change";
    else return `$${value}  (${percentage}%)`
  }

  showCard(event) {

    if (event.id == "homeInsuranceId" && this.isCardOpened == false && this.toggleSlideHome) {
      $(document.getElementsByClassName("homeIns")).removeClass("col-md-4 col-md-12 first second third");
      $(document.getElementsByClassName("lifeIns")).removeClass("col-md-4 col-md-12 first second third");
      $(document.getElementsByClassName("carIns")).removeClass("col-md-4 col-md-12 second first third");

      $(document.getElementsByClassName("homeIns")).addClass("col-md-12 first fade-in");
      $(document.getElementsByClassName("lifeIns")).addClass("col-md-4 second fade-in padtop");
      $(document.getElementsByClassName("carIns")).addClass("col-md-4 third fade-in padtop");
      $(document.getElementsByClassName("petIns")).addClass("col-md-4 fourth");
      $(document.getElementsByClassName("boatIns")).addClass("col-md-4 fifth");
      $(document.getElementsByClassName("rentIns")).addClass("col-md-4 sixth");


      this.mode = this.mode == 'collapseHomeCard' ? 'expandHomeCard' : 'expandHomeCard';
      this.isCardOpened = true;

      this.hideHomeCard = false;
      this.showHomeCard = true;
      this.hideBoatCard = true;
      this.hideRentCard = true;
    }
    else if (event.id == "lifeInsuranceId" && this.isCardOpened == false && this.toggleSlideLife) {
      $(document.getElementsByClassName("homeIns")).removeClass("col-md-4 col-md-12 first second third");
      $(document.getElementsByClassName("lifeIns")).removeClass("col-md-4 col-md-12 first second third");
      $(document.getElementsByClassName("carIns")).removeClass("col-md-4 col-md-12 second first third");

      $(document.getElementsByClassName("lifeIns")).addClass("col-md-12 first fade-in");
      $(document.getElementsByClassName("homeIns")).addClass("col-md-4 second padtop");
      $(document.getElementsByClassName("carIns")).addClass("col-md-4 third padtop");
      $(document.getElementsByClassName("petIns")).addClass("col-md-4 fourth");
      $(document.getElementsByClassName("boatIns")).addClass("col-md-4 fifth");
      $(document.getElementsByClassName("rentIns")).addClass("col-md-4 sixth");

      this.mode = this.mode == 'collapseLifeCard' ? 'expandLifeCard' : 'expandLifeCard';
      this.isCardOpened = true;
      this.hideLifeCard = false;
      this.showLifeCard = true;
      this.hideBoatCard = true;
      this.hideRentCard = true;
    }
    else if (event.id == "carInsuranceId" && this.isCardOpened == false && this.toggleSlideAuto) {
      $(document.getElementsByClassName("homeIns")).removeClass("col-md-4 col-md-12 first second third");
      $(document.getElementsByClassName("lifeIns")).removeClass("col-md-4 col-md-12 first second third");
      $(document.getElementsByClassName("carIns")).removeClass("col-md-4 col-md-12 second first third");

      $(document.getElementsByClassName("carIns")).addClass("col-md-12 first fade-in");
      $(document.getElementsByClassName("homeIns")).addClass("col-md-4 second padtop");
      $(document.getElementsByClassName("lifeIns")).addClass("col-md-4 third padtop");
      $(document.getElementsByClassName("petIns")).addClass("col-md-4 fourth");
      $(document.getElementsByClassName("boatIns")).addClass("col-md-4 fifth");
      $(document.getElementsByClassName("rentIns")).addClass("col-md-4 sixth");

      this.mode = this.mode == 'collapseCarCard' ? 'expandCarCard' : 'expandCarCard';
      this.isCardOpened = true;
      this.hideAutoCard = false;
      this.showAutoCard = true;
      this.hideBoatCard = true;
      this.hideRentCard = true;
    }
    // this.userData$.subscribe((data) => {
    //   console.log("new state data : " + JSON.stringify(data));
    // })
    // $(document).ready(function () {
    //   $(document.getElementById('homeInsurance')).removeClass('col-md-4');
    //   $(document.getElementById('homeInsurance')).addClass('col-md-12');
    // })
    //this.store.select('userDataState')
    //this.insuranceType = event.currentTarget.id;
    //event.currentTarget.id == this.homedivId[0].id
  }

  closeCard(event) {
    if (event.id == "homeInsuranceId") {
      this.mode = this.mode == 'collapseHomeCard' ? 'expandHomeCard' : 'collapseHomeCard';
      this.isCardOpened = false;
      this.hideHomeCard = true;
      this.showHomeCard = false;
      this.hideBoatCard = false;
      this.hideRentCard = false;
    }
    else if (event.id == "lifeInsuranceId") {
      this.mode = this.mode == 'collapseLifeCard' ? 'expandHomeCard' : 'collapseLifeCard';
      this.isCardOpened = false;
      this.hideLifeCard = true;
      this.showLifeCard = false;
      this.hideBoatCard = false;
      this.hideRentCard = false;
    }
    else if (event.id == "carInsuranceId") {
      this.mode = this.mode == 'collapseCarCard' ? 'expandCarCard' : 'collapseCarCard';
      this.isCardOpened = false;
      this.hideAutoCard = true;
      this.showAutoCard = false;
      this.hideBoatCard = false;
      this.hideRentCard = false;
    }
    $(document.getElementsByClassName("homeIns")).removeClass("col-md-12 first second third padtop");
    $(document.getElementsByClassName("lifeIns")).removeClass("col-md-12 first second third padtop");
    $(document.getElementsByClassName("carIns")).removeClass("col-md-12 second first third padtop");
    $(document.getElementsByClassName("lifeIns")).addClass("col-md-4 first");
    $(document.getElementsByClassName("homeIns")).addClass("col-md-4 second");
    $(document.getElementsByClassName("carIns")).addClass("col-md-4 third");
    $(document.getElementsByClassName("petIns")).addClass("col-md-4 fourth");
    $(document.getElementsByClassName("boatIns")).addClass("col-md-4 fifth");
    $(document.getElementsByClassName("rentIns")).addClass("col-md-4 sixth");

    if (event.change != undefined && event.change != 0)
      this.snackBar.openFromComponent(customSnackBar, {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbarStyle']
      });
  }

  onInputChange({ event, id, type }) {
    console.log(event.value);
    switch (type) {
      case 'home': {
        if (id == "Dwelling") {
          this.SliderData["dwelling"] = event.value;
        }
        else if (id == "otherStructure") {
          this.SliderData["otherStructure"] = event.value;
        }
        else if (id == "PersonalProperty") {
          this.SliderData["personalProperty"] = event.value;
        }
        else if (id == "PersonalLiability") {
          this.SliderData["personalLiability"] = event.value;
        }
        else if (id == "LossOfUse") {
          this.SliderData["lossOfUse"] = event.value;
        }
        else if (id == "Medical") {
          this.SliderData["medical"] = event.value;
        }
        break;
      }
      case 'life': {
        switch (id) {
          case 'DeathBenefit': {
            this.SliderData.deathBenefit = event.value;
            break;
          }
          case 'CurrentDebit': {
            this.SliderData.currentDebit = event.value;
            break;
          }
          case 'ChildEducationFund': {
            this.SliderData.childEducationFund = event.value;
            break;
          }
          case 'FuneralSpend': {
            this.SliderData.funeralSpend = event.value;
            break;
          }
          case 'RetirementAge': {
            this.SliderData.retirementAge = event.value;
            break;
          }
          case 'AnnualIncome': {
            this.SliderData.annualIncome = event.value;
            break;
          }
          case 'ReplacementIncome': {
            this.SliderData.replacementIncome = event.value;
            break;
          }
        }
        break;
      }
      case 'auto': {

        switch (id) {

          case 'BodilyInjuryLability': {
            this.SliderData.bodilyInjuryLability = event.value;
            break;
          }
          case 'PropertyDamageLiability': {
            this.SliderData.propertyDamageLiability = event.value;
            break;
          }
          case 'ComprehensiveAndCollision': {
            this.SliderData.comprehensiveAndCollision = event.value;
            break;
          }
          case 'PersonalInjuryProtection': {
            this.SliderData.personalInjuryProtection = event.value;
            break;
          }
          case 'Uninsured/UnderinsuredMotorist': {
            this.SliderData.uninsuredOrUnderinsuredMotorist = event.value;
            break;
          }
        }
      }
        break;
    }
    console.log("Sllider data is : " + JSON.stringify(this.SliderData));
  }

  isTotalPremiumCalculated = false;
  // calculateTotalPremium(cardIndex, premium) {

  //   this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
  //     let totalPrem = 0;

  //     if (this.isTotalPremiumCalculated == false) {
  //       this.isTotalPremiumCalculated = true;
  //       for (let i = 0; i < data.cards.length; i++) {
  //         if (data.cards[i].isEnabled == true)
  //           totalPrem = totalPrem + data.cards[i].premium
  //       }

  //       let prevStateData = JSON.parse(JSON.stringify(data))
  //       prevStateData.totalPremium = totalPrem;
  //       prevStateData = this.reCalculatePercentages(prevStateData)
  //       this.store.dispatch(actions.updateUserDataAct({ data: prevStateData }));
  //     }

  //   });
  // }

  reCalculatePercentages(prevStateData) {

    let totalPremium = prevStateData.totalPremium;

    for (let i = 0; i < prevStateData.cards.length; i++) {
      if (prevStateData.cards[i].isEnabled == true)
        prevStateData.cards[i].percentOutOfTotPremium = ((prevStateData.cards[i].premium / totalPremium) * 100).toFixed(1)
    }

    return prevStateData;
  }

  tempFlag = false;
  tempFlag2 = false;
  tempFlag3 = false;
  calculatePremium({ insuranceType }) {
    this.isAPICallComplete = true;
    switch (insuranceType) {

      case 'home': {
        this.tempFlag = false;
        // to populate slider min values in payload JSON.
        this.SliderData.dwelling_min = this.sliderVariableValues.dwelling_min;
        this.SliderData.otherStructure_min = this.sliderVariableValues.otherStructure_min;
        this.SliderData.personalProperty_min = this.sliderVariableValues.personalProperty_min;
        this.SliderData.personalLiability_min = this.sliderVariableValues.personalLiability_min;
        this.SliderData.lossOfUse_min = this.sliderVariableValues.lossOfUse_min;
        this.SliderData.medical_min = this.sliderVariableValues.medical_min;

        this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
          //console.log("Data is :" + JSON.stringify(data))

          let index = data.cards.findIndex(obj => obj.key == 'home')

          let dwelling_default = this.SliderData.dwelling
          if (this.tempFlag == false) {
            this.tempFlag = true
            if (this.SliderData.dwelling == undefined || this.SliderData.dwelling == 0)
              dwelling_default = data.cards[index].coverage

            let payloadJSON = {
              data: {
                'insuranceType': 'home',
                'premium': data.default_home_premium,
                'stateName': data.cards[index].state_name,
                'insuranceData': this.SliderData,
                'policyData': undefined
              }
            }

            if (this.homehiddenfields == false) {
              payloadJSON.data.policyData =
              {
                roofCondition: this.roofCondition,
                plumingCondition: this.plumingCondition,
                burglerAlarm: this.burglerAlarm,
                floodInsurance: this.floodInsurance
              }
            }
            this.updateTotalPremiumInStore(payloadJSON, 'home', data, dwelling_default)
          }

        });
        break;
      }
      case 'life': {

        this.tempFlag2 = false;
        this.SliderData.deathBenefit_min = 250000;
        this.SliderData.currentDebit_min = 180000;
        this.SliderData.childEducationFund_min = 50000
        this.SliderData.funeralSpend_min = 2500;
        this.SliderData.retirementAge_min = 50;
        this.SliderData.annualIncome_min = 50000;
        this.SliderData.replacementIncome_min = 5;

        this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

          let index = data.cards.findIndex(obj => obj.key == 'life')
          if (this.tempFlag2 == false) {
            this.tempFlag2 = true;
            if (data != undefined && data != {}) {

              if (this.SliderData.deathBenefit == undefined || this.SliderData.deathBenefit == 0)
                this.SliderData.deathBenefit = 250000;

              let ageBracketPrem = data.selectedAgeBracket.filter((item) => {
                return item['Death Benefit'] == this.SliderData.deathBenefit
              })


              let payloadJSON = {
                data: {
                  'insuranceType': 'life',
                  'premium': ageBracketPrem[0].Premium,
                  'deathBenefit': this.SliderData.deathBenefit,
                  'insuranceData': this.SliderData
                }
              }
              this.updateTotalPremiumInStore(payloadJSON, 'life', data, this.SliderData.deathBenefit)
            }
          }

        });
        break;
      }
      case 'auto': {
        this.tempFlag3 = false;
        // to populate slider min values in payload JSON.
        this.SliderData.bodilyInjuryLability_min = this.sliderAutoVariableValues.bodilyInjuryLability_min;
        this.SliderData.propertyDamageLiability_min = this.sliderAutoVariableValues.propertyDamageLiability_min
        this.SliderData.comprehensiveAndCollision_min = this.sliderAutoVariableValues.comprehensiveAndCollision_min
        this.SliderData.personalInjuryProtection_min = this.sliderAutoVariableValues.personalInjuryProtection_min
        this.SliderData.uninsuredOrUnderinsuredMotorist_min = this.sliderAutoVariableValues.uninsuredOrUnderinsuredMotorist_min

        this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

          let index = data.cards.findIndex(obj => obj.key == 'auto')
          if (this.tempFlag3 == false) {
            this.tempFlag3 = true;
            let bodilyInjuryLability = this.SliderData.bodilyInjuryLability;
            if (bodilyInjuryLability == 0 || this.SliderData.bodilyInjuryLability == undefined)
              bodilyInjuryLability = this.SliderData.propertyDamageLiability_min;

            let homeIndex = data.cards.findIndex(obj => obj.key == 'home');


            let payloadJSON = {
              data: {
                'insuranceType': 'auto',
                'premium': data.cards[index].defaultPremium,
                'stateName': data.cards[homeIndex].state_name,
                'insuranceData': this.SliderData,
                'nosOfAutos': parseInt(data.cards[index].nosOfAutos + "")
              }
            }

            this.updateTotalPremiumInStore(payloadJSON, 'auto', data, bodilyInjuryLability)
          }

        });


        break;
      }
    }
  }



  reCalculateTotalPremium(stateJson) {

    let totalPrem = 0;


    for (let i = 0; i < 6; i++) {
      if (stateJson.cards[i].isEnabled == true)
        totalPrem = totalPrem + stateJson.cards[i].premium
    }

    stateJson.totalPremium = totalPrem;
    return stateJson;

  }

  callFlag = false;

  updateTotalPremiumInStore(payloadJSON, insuranceType, prevState, newCoverage) {

    this.callFlag = false;
    let index = prevState.cards.findIndex(obj => obj.key == insuranceType)
    try {
      this.ikservice.postInsuranceData(payloadJSON).subscribe((res) => {
        try {
          if (this.callFlag == false) {

            this.callFlag = true;
            let newState = JSON.parse(JSON.stringify(prevState))
            if (insuranceType == 'life') {
              newState.cards[index].premium = res.data.newPremium.term_insurance //+ res.data.newPremium.term_insurance
              newState.cards[index].coverage = res.data.newPremium.term_benefit
            } else {
              newState.cards[index].premium = res.data.newPremium
              newState.cards[index].coverage = newCoverage
            }

            newState.hasStateChanged = "false";
            newState.cards[index].insight = res.data.insight
            newState.cards[index].risk = res.data.risk.toLowerCase()
            if (res.data.risk.length > 1) {
              newState.cards[index].showRiskModel = false
              this.showMask = false;
            }
            //newState.cards[index].oldPremium = prevState.cards[index].premium
            //newState.cards[index].oldCoverage = prevState.cards[index].coverage


            //newState.cards[index].oldNewPremChangeInPercent = parseInt((((newState.cards[index].premium - newState.cards[index].oldPremium) / newState.cards[index].oldPremium) * 100).toString())
            newState.cards[index].oldNewPremChangeInPercent = (((newState.cards[index].premium - newState.cards[index].oldPremium) / newState.cards[index].oldPremium) * 100).toFixed(1)

            newState.cards[index].oldNewPremChangeInValue = newState.cards[index].premium - newState.cards[index].oldPremium;


            this.isAPICallComplete = false;
            newState = this.reCalculateTotalPremium(newState)
            //  newState.oldNewTotalPremChangeInPercent = parseInt((((newState.totalPremium - newState.oldTotalPremium) / newState.oldTotalPremium) * 100).toString())
            newState.oldNewTotalPremChangeInPercent = (((newState.totalPremium - newState.oldTotalPremium) / newState.oldTotalPremium) * 100).toFixed(1)
            newState.oldNewTotalPremChangeInValue = newState.totalPremium - newState.oldTotalPremium;
            newState = this.reCalculatePercentages(newState)
            this.store.dispatch(actions.updateUserDataAct({ data: newState }));

          }

        } catch (err) {
          throw err;
        }
      });


    } catch (err) {
      throw err;
    }

  }

  isToggle = false;

  OnInsuanceSlideToggle({ insuranceType, event }) {
    this.isToggle = false;

    if (insuranceType == "life") {
      this.toggleSlideLife = event.checked;
      if (this.toggleSlideLife) {
        $(document.getElementsByClassName("lifeIns")).removeClass("inactiveGrey");
      }
      else {
        $(document.getElementsByClassName("lifeIns")).addClass("col-md-4 inactiveGrey");
      }
    }
    if (insuranceType == "home") {
      this.toggleSlideHome = event.checked;
      if (this.toggleSlideHome) {
        $(document.getElementsByClassName("homeIns")).removeClass("inactiveGrey");
      }
      else {
        $(document.getElementsByClassName("homeIns")).addClass("col-md-4 inactiveGrey");
      }
    }
    if (insuranceType == "auto") {
      this.toggleSlideAuto = event.checked;
      if (this.toggleSlideAuto) {
        $(document.getElementsByClassName("carIns")).removeClass("inactiveGrey");
      }
      else {
        $(document.getElementsByClassName("carIns")).addClass("col-md-4 inactiveGrey");
      }
    }
    if (insuranceType == "pet") {
      if (event.checked) {
        $(document.getElementsByClassName("petIns")).removeClass("inactiveGrey");
      }
      else {
        $(document.getElementsByClassName("petIns")).addClass("col-md-4 inactiveGrey");
      }
    }
    if (insuranceType == "boat") {
      if (event.checked) {
        $(document.getElementsByClassName("boatIns")).removeClass("inactiveGrey");
      }
      else {
        $(document.getElementsByClassName("boatIns")).addClass("col-md-4 inactiveGrey");
      }
    }
    if (insuranceType == "renters") {
      if (event.checked) {
        $(document.getElementsByClassName("rentIns")).removeClass("inactiveGrey");
      }
      else {
        $(document.getElementsByClassName("rentIns")).addClass("col-md-4 inactiveGrey");
      }
    }

    if (event.checked == true) {

      this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
        if (this.isToggle == false) {
          this.isToggle = true;
          let index = data.cards.findIndex(obj => obj.key == insuranceType);
          let prevState = JSON.parse(JSON.stringify(data))
          prevState.cards[index].isEnabled = true
          prevState = this.reCalculateTotalPremium(prevState)
          prevState = this.reCalculatePercentages(prevState)
          prevState.oldNewTotalPremChangeInPercent = (((prevState.totalPremium - prevState.oldTotalPremium) / prevState.oldTotalPremium) * 100).toFixed(1)
          prevState.oldNewTotalPremChangeInValue = prevState.totalPremium - prevState.oldTotalPremium;
          this.store.dispatch(actions.updateUserDataAct({ data: prevState }));

        }
      });
    }
    if (event.checked == false) {

      this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
        if (this.isToggle == false) {
          this.isToggle = true;
          let index = data.cards.findIndex(obj => obj.key == insuranceType);
          let prevState = JSON.parse(JSON.stringify(data))
          prevState.cards[index].isEnabled = false
          prevState = this.reCalculateTotalPremium(prevState)
          prevState = this.reCalculatePercentages(prevState)
          prevState.oldNewTotalPremChangeInPercent = (((prevState.totalPremium - prevState.oldTotalPremium) / prevState.oldTotalPremium) * 100).toFixed(1)
          prevState.oldNewTotalPremChangeInValue = prevState.totalPremium - prevState.oldTotalPremium;
          this.store.dispatch(actions.updateUserDataAct({ data: prevState }));

        }
      });

    }
  }

  clearCard(event) {
    $(document.getElementsByClassName("homeInsurance")).removeClass("col-md-12");
    $(document.getElementsByClassName("homeInsurance")).addClass("col-md-4");
  }

  isPolicyCalled = false;
  uploadPolicy(event) {
    this.isPolicyCalled = false;
    // this.isStateDataSet = false;
    // let loggedInUser = "Allen Baker";
    // console.log('loggedIn User is:' + loggedInUser);
    this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
      let prevState = JSON.parse(JSON.stringify(data));
      prevState.loggedInUser = "Jack Smith";
      if (this.isPolicyCalled == false) {
        this.isPolicyCalled = true;
        this.store.dispatch(actions.updateUserDataAct({ data: prevState }));
      }
    })


    if (event.id == "lifeInsuranceId") {
      this.lifehiddenfields = false;
      $(document.getElementsByClassName("lifecardhiddenfields")).addClass("fade-in");
      $(document.getElementsByClassName("lifeIndBtnCls")).addClass("changeBgColor");

      $("#mask").fadeTo(100, 0.1);
      this.showUploadPolicyPopup = false;
      this.showMask = false;
    }

    if (event.id == "homeInsuranceId") {
      this.homehiddenfields = false;
      $(document.getElementsByClassName("homecardhiddenfields")).addClass("fade-in");
      $(document.getElementsByClassName("homeIndBtnCls")).addClass("changeBgColor");

      $("#mask").fadeTo(100, 0.1);
      this.showUploadPolicyPopup = false;
      this.showMask = false;
    }
    if (event.id == "carInsuranceId") {
      this.autohiddenfields = false;
      $(document.getElementsByClassName("autocardhiddenfields")).addClass("fade-in");
      $(document.getElementsByClassName("carIndBtnCls")).addClass("changeBgColor");

      $("#mask").fadeTo(100, 0.1);
      this.showUploadPolicyPopup = false;
      this.showMask = false;
    }
  }

  handlePopupAcceptBtn(insuranceType) {
    this.showUploadPolicyPopup = true;
    this.showMask = true;
    switch (insuranceType) {
      case 'home': {

        this.sliderVariableValues.dwelling = 200000;
        this.sliderVariableValues.otherStructure = 20000;
        this.sliderVariableValues.personalProperty = 150000;
        this.sliderVariableValues.lossOfUse = 60000;
        this.sliderVariableValues.personalLiability = 300000;
        this.sliderVariableValues.medical = 5000;


        this.SliderData["dwelling"] = 200000;
        this.SliderData["otherStructure"] = 20000;
        this.SliderData["personalProperty"] = 150000;
        this.SliderData["lossOfUse"] = 60000;
        this.SliderData["personalLiability"] = 300000;
        this.SliderData["medical"] = 5000;


        this.burglerAlarm = true;
        this.tempFlag4 = true;


        break;
      }
      case 'auto': {

        this.sliderAutoVariableValues.bodilyInjuryLability = 250000;
        this.sliderAutoVariableValues.propertyDamageLiability = 100000;
        this.sliderAutoVariableValues.comprehensiveAndCollision = 250;
        this.sliderAutoVariableValues.personalInjuryProtection = 2000;
        this.sliderAutoVariableValues.uninsuredOrUnderinsuredMotorist = 300000;
        this.sliderAutoVariableValues.yearlymiles = 10000;

        this.SliderData["bodilyInjuryLability"] = 250000;
        this.SliderData["propertyDamageLiability"] = 100000;
        this.SliderData["comprehensiveAndCollision"] = 250;
        this.SliderData["personalInjuryProtection"] = 2000;
        this.SliderData["uninsuredOrUnderinsuredMotorist"] = 300000;
        this.SliderData["yearlymiles"] = 10000;

        break;
      }
    }

  }


  handleOptimizeClick(insuranceType) {
    switch (insuranceType) {
      case 'home': {
        $("#mask").fadeTo(100, 0.1);
        this.showLoadingAnimation = true;

        this.sliderVariableValues.dwelling = 220000;
        this.sliderVariableValues.otherStructure = 25000;
        this.sliderVariableValues.personalProperty = 150000;
        this.sliderVariableValues.lossOfUse = 40000;
        this.sliderVariableValues.personalLiability = 300000;
        this.sliderVariableValues.medical = 3000;

        this.SliderData["dwelling"] = 220000;
        this.SliderData["otherStructure"] = 20000;
        this.SliderData["personalProperty"] = 150000;
        this.SliderData["lossOfUse"] = 40000;
        this.SliderData["personalLiability"] = 300000;
        this.SliderData["medical"] = 3000;
        this.calculatePremium({ insuranceType: 'home' })

        setTimeout(() => {
          this.showLoadingAnimation = false;
          this.showMask = true;

          this.snackBar.openFromComponent(OptimizePolicyCustomSnackBar, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbarStyle']
          });

        }, 3500);
        this.showMask = false;
        break;
      }
      case 'auto': {
        $("#mask").fadeTo(100, 0.1);
        this.showLoadingAnimation = true;

        this.sliderAutoVariableValues.bodilyInjuryLability = 250000;
        this.sliderAutoVariableValues.propertyDamageLiability = 100000;
        this.sliderAutoVariableValues.comprehensiveAndCollision = 1000;
        this.sliderAutoVariableValues.personalInjuryProtection = 5000;
        this.sliderAutoVariableValues.uninsuredOrUnderinsuredMotorist = 250000;
        //this.sliderAutoVariableValues.yearlymiles = 10000;



        this.SliderData["bodilyInjuryLability"] = 250000;
        this.SliderData["propertyDamageLiability"] = 100000;
        this.SliderData["comprehensiveAndCollision"] = 1000;
        this.SliderData["personalInjuryProtection"] = 5000;
        this.SliderData["uninsuredOrUnderinsuredMotorist"] = 250000;
        //this.SliderData["yearlymiles"] = 10000;
        this.calculatePremium({ insuranceType: 'auto' })

        setTimeout(() => {
          this.showLoadingAnimation = false;
          this.showMask = true;

          this.snackBar.openFromComponent(OptimizePolicyCustomSnackBar, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbarStyle']
          });

        }, 3500);
        this.showMask = false;
        break;
      }
      case 'life': {
        $("#mask").fadeTo(100, 0.1);
        this.showLoadingAnimation = true;

        this.sliderLifeVariableValues.deathBenefit = 500000;
        this.sliderLifeVariableValues.currentDebit = 180000;
        this.sliderLifeVariableValues.childEducationFund = 100000;
        this.sliderLifeVariableValues.funeralSpend = 2500;
        //this.sliderLifeVariableValues.retirementAge = 50;
        this.sliderLifeVariableValues.annualIncome = 100000;
        this.sliderLifeVariableValues.replacementIncome = 5;

        this.SliderData["deathBenefit"] = 500000;
        this.SliderData["currentDebit"] = 180000;
        this.SliderData["childEducationFund"] = 100000;
        this.SliderData["funeralSpend"] = 2500;
        //this.SliderData["retirementAge"] = 50;
        this.SliderData["annualIncome"] = 100000;
        this.SliderData["replacementIncome"] = 5;
        this.calculatePremium({ insuranceType: 'life' })

        setTimeout(() => {
          this.showLoadingAnimation = false;
          this.showMask = true;

          this.snackBar.openFromComponent(OptimizePolicyCustomSnackBar, {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbarStyle']
          });

        }, 3500);
        this.showMask = false;
        break;
      }

    }

  }
}


@Component({
  selector: 'custom-snackbar.component',
  templateUrl: 'custom-snackbar.component.html',
  styles: [],
})
export class customSnackBar {
  constructor(
    public snackBarRef: MatSnackBarRef<customSnackBar>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}



@Component({
  selector: 'optimize-policy-custom-snackbar',
  templateUrl: 'optimize-policy-custom-snackbar.component.html',
  styles: [],
})
export class OptimizePolicyCustomSnackBar {
  constructor(
    public snackBarRef: MatSnackBarRef<customSnackBar>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
