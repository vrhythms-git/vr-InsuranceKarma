import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";
import { IKServices } from "../services/app.service";
import * as $ from "jquery";
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
        height: '100%',
        width: '90%'
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
        height: '290px',
        width: '89.7%'
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
        height: '300px',
        width: '89.7%'
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

  // formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   minimumFractionDigits: 2
  // })



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

  constructor(private store: Store<UserData>, private ikservice: IKServices) {

    // this.stateData$ =  this.store.pipe(select(CounterSelector.selectUserData))
    //(this.stateData$ = storeData));
  }

  // stateData : Observable;

  isDataAvailable = false;

  ngOnInit(): void {

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

        let index = data.cards.findIndex(obj => obj.key == 'home')
        let dwelling_default = data.cards[index].coverage
        // console.log("Subscription Event Occured.... with data" + JSON.stringify(data));
        this.sliderVariableValues.dwelling_min = dwelling_default,
          //this.sliderVariableValues.dwelling = dwelling_default,
          this.sliderVariableValues.dwelling_max = dwelling_default + 500000,

          this.sliderVariableValues.otherStructure_min = (parseInt(dwelling_default) * 0.10)
        //this.sliderVariableValues.otherStructure = (parseInt(dwelling_default) * 0.10)
        this.sliderVariableValues.otherStructure_max = (parseInt(dwelling_default) * 0.10) + 50000

        this.sliderVariableValues.personalProperty_min = (parseInt(dwelling_default) * 0.70)
        //this.sliderVariableValues.personalProperty = (parseInt(dwelling_default) * 0.70)
        this.sliderVariableValues.personalProperty_max = (parseInt(dwelling_default) * 0.70) + 100000

        this.sliderVariableValues.lossOfUse_min = (parseInt(dwelling_default) * 0.20)
        //this.sliderVariableValues.lossOfUse = (parseInt(dwelling_default) * 0.20)
        this.sliderVariableValues.lossOfUse_max = (parseInt(dwelling_default) * 0.20) + 50000

        this.sliderVariableValues.personalLiability_min = dwelling_default
        //this.sliderVariableValues.personalLiability = dwelling_default
        this.sliderVariableValues.personalLiability_max = dwelling_default + 500000

        this.sliderVariableValues.medical_min = 2000
        //this.sliderVariableValues.medical = 2000
        this.sliderVariableValues.medical_max = 7000

        //console.log("Calculated data is : " + JSON.stringify(this.sliderVariableValues));
      }
    });

  }

  getChangeFormattedText(percentage, value) {

    if (percentage == 0)
      return "--no change";
    else return `${value}  ${(percentage)}%`
  }

  showCard(event) {

    if (event.id == "homeInsuranceId" && this.isCardOpened == false && this.toggleSlideHome) {
      $(document.getElementsByClassName("homeIns")).removeClass("col-md-4 col-md-12 first second third");
      $(document.getElementsByClassName("lifeIns")).removeClass("col-md-4 col-md-12 first second third");
      $(document.getElementsByClassName("carIns")).removeClass("col-md-4 col-md-12 second first third");

      $(document.getElementsByClassName("homeIns")).addClass("col-md-12 first fade-in");
      $(document.getElementsByClassName("lifeIns")).addClass("col-md-4 second fade-in");
      $(document.getElementsByClassName("carIns")).addClass("col-md-4 third fade-in");
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
      $(document.getElementsByClassName("homeIns")).addClass("col-md-4 second");
      $(document.getElementsByClassName("carIns")).addClass("col-md-4 third");
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
      $(document.getElementsByClassName("homeIns")).addClass("col-md-4 second");
      $(document.getElementsByClassName("lifeIns")).addClass("col-md-4 third");
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
    $(document.getElementsByClassName("homeIns")).removeClass("col-md-12 first second third");
    $(document.getElementsByClassName("lifeIns")).removeClass("col-md-12 first second third");
    $(document.getElementsByClassName("carIns")).removeClass("col-md-12 second first third");
    $(document.getElementsByClassName("lifeIns")).addClass("col-md-4 first");
    $(document.getElementsByClassName("homeIns")).addClass("col-md-4 second");
    $(document.getElementsByClassName("carIns")).addClass("col-md-4 third");
    $(document.getElementsByClassName("petIns")).addClass("col-md-4 fourth");
    $(document.getElementsByClassName("boatIns")).addClass("col-md-4 fifth");
    $(document.getElementsByClassName("rentIns")).addClass("col-md-4 sixth");
  }

  onInputChange({ event, id, type }) {
    console.log(event.value);
    switch (type) {
      case 'home': {
        if (id == "Dwelling") {
          this.SliderData["dwelling"] = event.value;
          //this.sliderVariableValues.dwelling = data.dwelling_default,
          /*
          this.sliderVariableValues.otherStructure = (parseInt(event.value) * 0.10)
          this.sliderVariableValues.personalProperty = (parseInt(event.value) * 0.70)
          this.sliderVariableValues.lossOfUse = (parseInt(event.value) * 0.20)
          this.sliderVariableValues.personalLiability = event.value
        */
          console.log("New Data is :: " + JSON.stringify(this.sliderVariableValues))
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
  calculateTotalPremium(cardIndex, premium) {
    this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
      let totalPrem = 0;
      if (this.isTotalPremiumCalculated == false) {
        this.isTotalPremiumCalculated = true;
        for (let i = 0; i < data.cards.length; i++) {
          if (data.cards[i].isEnabled == true)
            totalPrem = totalPrem + data.cards[i].premium
        }

        let prevStateData = JSON.parse(JSON.stringify(data))
        prevStateData.totalPremium = totalPrem;
        //prevStateData.cards[cardIndex].percentOutOfTotPremium = parseInt(((premium / totalPrem) * 100).toString()) 
        prevStateData = this.reCalculatePercentages(prevStateData)
        this.store.dispatch(actions.updateUserDataAct({ data: prevStateData }));
      }

    });
  }

  reCalculatePercentages(prevStateData) {

    let totalPremium = prevStateData.totalPremium;

    for (let i = 0; i < prevStateData.cards.length; i++) {
      if (prevStateData.cards[i].isEnabled == true)
        prevStateData.cards[i].percentOutOfTotPremium = parseInt(((prevStateData.cards[i].premium / totalPremium) * 100).toString())
    }

    return prevStateData;
  }

  tempFlag = false;
  tempFlag2 = false;
  calculatePremium({ insuranceType }) {
    this.tempFlag = false;
    switch (insuranceType) {

      case 'home': {
        // to populate slider min values in payload JSON.
        this.SliderData.dwelling_min = this.sliderVariableValues.dwelling_min;
        this.SliderData.otherStructure_min = this.sliderVariableValues.otherStructure_min;
        this.SliderData.personalProperty_min = this.sliderVariableValues.personalProperty_min;
        this.SliderData.personalLiability_min = this.sliderVariableValues.personalLiability_min;
        this.SliderData.lossOfUse_min = this.sliderVariableValues.lossOfUse_min;
        this.SliderData.medical_min = this.sliderVariableValues.medical_min;

        let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
          //console.log("Data is :" + JSON.stringify(data))

          let index = data.cards.findIndex(obj => obj.key == 'home')

          if (this.tempFlag == false) {
            let payloadJSON = {
              data: {
                'insuranceType': 'home',
                'premium': data.cards[index].premium,
                'insuranceData': this.SliderData
              }
            }
            // console.log("Json payload for /getPremium is: " + JSON.stringify(payloadJSON))
            this.updateTotalPremiumInStore(payloadJSON, 'home', data, 300000)

            let totalPrem = 0;
            if (this.isTotalPremiumCalculated == false) {
              this.isTotalPremiumCalculated = true;
              for (let i = 0; i < data.cards.length; i++) {
                if (data.cards[i].isEnabled == true)
                  totalPrem = totalPrem + data.cards[i].premium
              }

              let prevStateData = JSON.parse(JSON.stringify(data))
              prevStateData.totalPremium = totalPrem;
              prevStateData = this.reCalculatePercentages(prevStateData)
              // prevStateData.cards[index].percentOutOfTotPremium = parseInt(((data.cards[index].premium / totalPrem) * 100).toString()) 
              this.store.dispatch(actions.updateUserDataAct({ data: prevStateData }));
            }

          }

        });
        break;
      }
      case 'life': {

        this.tempFlag2 = false;
        this.SliderData.deathBenefit_min = 250000;
        this.SliderData.currentDebit_min = 180000;
        this.SliderData.childEducationFund_min = 50000
        this.SliderData.funeralSpend = 2500;
        this.SliderData.retirementAge = 50;
        this.SliderData.annualIncome = 50000;
        this.SliderData.replacementIncome = 5;

        let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
         // console.log("Data is :" + JSON.stringify(data))

          let index = data.cards.findIndex(obj => obj.key == 'life')
          if(this.tempFlag2 == false){
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
            // console.log("Json payload for /getPremium is: " + JSON.stringify(payloadJSON))

            this.updateTotalPremiumInStore(payloadJSON, 'life', data, this.SliderData.deathBenefit)

            // let totalPrem = 0;
            // if (this.isTotalPremiumCalculated == false) {
            //   this.isTotalPremiumCalculated = true;
            //   for (let i = 0; i < data.cards.length; i++) {
            //     if (data.cards[i].isEnabled == true)
            //       totalPrem = totalPrem + data.cards[i].premium
            //   }

              //let prevStateData = JSON.parse(JSON.stringify(data))
             // prevStateData.totalPremium = totalPrem;
            //  prevStateData = this.reCalculatePercentages(prevStateData)
             // this.store.dispatch(actions.updateUserDataAct({ data: prevStateData }));
           // }
          
          }
        }

        });
        break;
      }
      case 'auto': {

        break;
      }
    }
  }

  insight = '';

  reCalculateTotalPremium(stateJson){

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
     this.ikservice.postInsuranceData(payloadJSON).subscribe((res) => {
      if (this.callFlag == false) {
        this.callFlag = true;
        let newState = JSON.parse(JSON.stringify(prevState))
        if(insuranceType == 'home')
        newState.cards[index].premium = res.data.newPremium
        else
        newState.cards[index].premium = res.data.newPremium.whole_life_insurance

        newState.cards[index].insight = res.data.insight
        newState.cards[index].risk = res.data.risk
        newState.cards[index].oldPremium = prevState.cards[index].premium
        newState.cards[index].oldCoverage = prevState.cards[index].coverage
        newState.cards[index].coverage = newCoverage

        newState.cards[index].oldNewPremChangeInPercent = parseInt((((newState.cards[index].premium - newState.cards[index].oldPremium) / newState.cards[index].oldPremium) * 100).toString())
       
        newState.cards[index].oldNewPremChangeInValue = newState.cards[index].oldPremium - newState.cards[index].premium

        if (res.data.risk == 'medium' || res.data.risk == 'high')
          newState.cards[index].notification = true
        else
          newState.cards[index].notification = false

        // console.log('Calculated premium new state is: ' + JSON.stringify(newState))
        // if( res.data.risk == 'high')
        this.insight = res.data.insight;
        newState = this.reCalculateTotalPremium(newState)
        newState = this.reCalculatePercentages(newState)
        this.store.dispatch(actions.updateUserDataAct({ data: newState }));
        // this.footer.populateUI()
        // subscription.unsubscribe();
      }
    });


  }

  isToggle = false;

  OnInsuanceSlideToggle({ insuranceType, event }) {
    this.isToggle = false;
    // if (insuranceType == "home") {
    //   this.toggleSlideHome = event.checked;
    // }
    // if (insuranceType == "life") {
    //   this.toggleSlideLife = event.checked;
    // }
    // if (insuranceType == "auto") {
    //   this.toggleSlideAuto = event.checked;
    // }

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
          let index = data.cards.findIndex(obj => obj.key == insuranceType);
          let prevState = JSON.parse(JSON.stringify(data))
          prevState.cards[index].isEnabled = true

          let totalPrem = 0;
          for (let i = 0; i < data.cards.length; i++) {
            if (prevState.cards[i].isEnabled == true)
              totalPrem = totalPrem + data.cards[i].premium

          }

          prevState.totalPremium = totalPrem;
          prevState = this.reCalculatePercentages(prevState)
          this.store.dispatch(actions.updateUserDataAct({ data: prevState }));
          this.isToggle = true;
        }
      });
      // subscribedStore.unsubscribe()
    } else if (event.checked == false) {

      this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
        if (this.isToggle == false) {
          let index = data.cards.findIndex(obj => obj.key == insuranceType);
          let prevState = JSON.parse(JSON.stringify(data))
          prevState.cards[index].isEnabled = false
          let totalPrem = 0;
          for (let i = 0; i < data.cards.length; i++) {
            if (prevState.cards[i].isEnabled == true)
              totalPrem = totalPrem + data.cards[i].premium
          }


          prevState.totalPremium = totalPrem;
          prevState = this.reCalculatePercentages(prevState)
          this.store.dispatch(actions.updateUserDataAct({ data: prevState }));
          this.isToggle = true;
        }
      });

    }
  }

  /*
  OnInsuanceSlideToggle({ insuranceType, event }) {
    switch (insuranceType) {
      case 'pet': {

        let subscribed = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
          if (data != undefined && data != {}) {
            if (event.checked == true) {


            } else if (event.checked == false) {


            }
          }
          //   let json = JSON.parse(JSON.stringify(data))
          //   json.petIncCard = {
          //     coverage  : 5000,
          //     premium: 130
          //   }


          //  this.store.dispatch(actions.updateUserDataAct({ data: json }));
          // }
        });
        subscribed.unsubscribe();
        break;
      }
      case 'boat': {


        //subscribed.unsubscribe();
        break;
      }
      case 'renters': {
        let subscribed = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
          if (data != undefined && data != {}) {
            let json = JSON.parse(JSON.stringify(data))
            json.rentersIncCard = {
              coverage: 50000,
              premium: 1300
            }
            this.store.dispatch(actions.updateUserDataAct({ data: json }));
          }
        });
        subscribed.unsubscribe();

        break;
      }
    }
  }
*/
  clearCard(event) {
    $(document.getElementsByClassName("homeInsurance")).removeClass("col-md-12");
    $(document.getElementsByClassName("homeInsurance")).addClass("col-md-4");
  }

}
