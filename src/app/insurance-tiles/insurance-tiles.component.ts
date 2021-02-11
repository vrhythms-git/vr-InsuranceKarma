import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";
import { IKServices } from "../services/app.service";
import * as $ from "jquery";


@Component({
  selector: 'app-insurance-tiles',
  templateUrl: './insurance-tiles.component.html',
  styleUrls: ['./insurance-tiles.component.css']
})
export class InsuranceTilesComponent implements OnInit {

  userData$: Observable<any>;
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

  }

  ngOnInit(): void {
    this.homedivId = $(document.getElementById('homeInsurance'));
    this.lifedivId = $(document.getElementById('lifeInsurance'));
    this.autodivId = $(document.getElementById('autoInsurance'));

    this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

      if (data != undefined && data != {}) {
        //console.log("Subscription Event Occured.... with data" + JSON.stringify(data));
        this.sliderVariableValues.dwelling_min = data.dwelling_default,
          this.sliderVariableValues.dwelling = data.dwelling_default,
          this.sliderVariableValues.dwelling_max = data.dwelling_default + 500000,

          this.sliderVariableValues.otherStructure_min = (parseInt(data.dwelling_default) * 0.10)
        this.sliderVariableValues.otherStructure = (parseInt(data.dwelling_default) * 0.10)
        this.sliderVariableValues.otherStructure_max = (parseInt(data.dwelling_default) * 0.10) + 50000

        this.sliderVariableValues.personalProperty_min = (parseInt(data.dwelling_default) * 0.70)
        this.sliderVariableValues.personalProperty = (parseInt(data.dwelling_default) * 0.70)
        this.sliderVariableValues.personalProperty_max = (parseInt(data.dwelling_default) * 0.70) + 100000

        this.sliderVariableValues.lossOfUse_min = (parseInt(data.dwelling_default) * 0.20)
        this.sliderVariableValues.lossOfUse = (parseInt(data.dwelling_default) * 0.20)
        this.sliderVariableValues.lossOfUse_max = (parseInt(data.dwelling_default) * 0.20) + 50000

        this.sliderVariableValues.personalLiability_min = data.dwelling_default
        this.sliderVariableValues.personalLiability = data.dwelling_default
        this.sliderVariableValues.personalLiability_max = data.dwelling_default + 500000

        this.sliderVariableValues.medical_min = 2000
        this.sliderVariableValues.medical = 2000
        this.sliderVariableValues.medical_max = 7000

        //console.log("Calculated data is : " + JSON.stringify(this.sliderVariableValues));
      }
    });

  }

  handleCardClick(event) {

    //this.store.select('userDataState')
    this.insuranceType = event.currentTarget.id;
    if (event.currentTarget.id == this.homedivId[0].id) {
      this.hideHomeCard = false;
      this.showHomeCard = true;
    }
    else if (event.currentTarget.id == this.lifedivId[0].id) {
      this.hideLifeCard = false;
      this.showLifeCard = true;
    }
    else if (event.currentTarget.id == this.autodivId[0].id) {
      this.hideAutoCard = false;
      this.showAutoCard = true;
    }
    // this.userData$.subscribe((data) => {
    //   console.log("new state data : " + JSON.stringify(data));
    // })
    // $(document).ready(function () {
    //   $(document.getElementById('homeInsurance')).removeClass('col-md-4');
    //   $(document.getElementById('homeInsurance')).addClass('col-md-12');
    // })
  }

  closecard() {
    if (this.insuranceType == this.homedivId[0].id) {
      this.hideHomeCard = true;
      this.showHomeCard = false;
    }
    else if (this.insuranceType == this.lifedivId[0].id) {
      this.hideLifeCard = true;
      this.showLifeCard = false;
    }
    else if (this.insuranceType == this.autodivId[0].id) {
      this.hideAutoCard = true;
      this.showAutoCard = false;
    }
  }

  onInputChange({ event, id, type }) {
    console.log(event.value);
    switch (type) {
      case 'home': {
        if (id == "Dwelling") {
          this.SliderData["dwelling"] = event.value;
          //this.sliderVariableValues.dwelling = data.dwelling_default,
          this.sliderVariableValues.otherStructure = (parseInt(event.value) * 0.10)
          this.sliderVariableValues.personalProperty = (parseInt(event.value) * 0.70)
          this.sliderVariableValues.lossOfUse = (parseInt(event.value) * 0.20)
          this.sliderVariableValues.personalLiability = event.value
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
    }

  }

  calculatePremium() {

    // to populate slider min values in payload JSON.
    this.SliderData.otherStructure = this.sliderVariableValues.otherStructure;
    this.SliderData.personalProperty = this.sliderVariableValues.personalProperty;
    this.SliderData.personalLiability = this.sliderVariableValues.personalLiability;
    this.SliderData.lossOfUse_min = this.sliderVariableValues.lossOfUse_min;

    let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
      console.log("Data is :" + JSON.stringify(data))

      if (data != undefined && data != {}) {
        let payloadJSON = {
          data: {
            'insuranceType': 'home',
            'premium': data.Premium,
            'insuranceData': this.SliderData
          }
        }
        console.log("Json payload for /getPremium is: " + JSON.stringify(payloadJSON))


        this.ikservice.postInsuranceData(payloadJSON).subscribe((res) => {
          let newState = JSON.parse(JSON.stringify(data))
          newState.calculatedPremium = res
          console.log('Calculated premium new state is: ' + JSON.stringify(newState))
          this.store.dispatch(actions.updateUserDataAct({ data: newState }));
          // this.footer.populateUI()
          subscription.unsubscribe();
        });
      }

    })


  }

  clearCard(event) {
    $(document.getElementsByClassName("homeInsurance")).removeClass("col-md-12");
    $(document.getElementsByClassName("homeInsurance")).addClass("col-md-4");
  }

}
