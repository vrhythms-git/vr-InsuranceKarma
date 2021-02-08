import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";
import { IKServices } from "../services/app.service";
//declare var $: any;
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
  showAutoCard: boolean = true;

  constructor(private store: Store<UserData>, private ikservice: IKServices) {

  }

  ngOnInit(): void {
    this.homedivId = $(document.getElementById('homeInsurance'));
    this.lifedivId = $(document.getElementById('lifeInsurance'));
    this.autodivId = $(document.getElementById('autoInsurance'));

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
    else if (this.insuranceType == this.lifedivId[0].id){
      this.hideLifeCard = true;
      this.showLifeCard = false;
    }
    else if (this.insuranceType == this.autodivId[0].id){
      this.hideAutoCard = true;
      this.showAutoCard = false;
    }
}

  onInputChange({ event, id }) {
    console.log(event.value);
    if (id == "Dwelling") {
      this.SliderData["DwellingValue"] = event.value;
    }
    else if (id == "otherStructure") {
      this.SliderData["OtherStructureValue"] = event.value;
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
  }

  calculatePremium() {
    //this.InsuranceData = ({type:this.insuranceType,sliderData:this.SliderData});
    // console.log("insurance data: " + JSON.stringify(this.InsuranceData))

      //this.userData$ = 
    //   this.userData$.subscribe((data) => {
    //   console.log("new state data : " + JSON.stringify(data));
    // })

    this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data)=>{

      console.log("Data is :" + JSON.stringify(data))

      if(data !=undefined && data!= {}){
      let payloadJSON = {
        data: {
          'insuranceType': 'home',
          'premium': 370,
          'insuranceData': this.SliderData
        }
      }
     console.log("Json payload for /getPremium is: " + JSON.stringify(payloadJSON))

      
      this.ikservice.postInsuranceData(payloadJSON).subscribe((res) => {
        let newState = JSON.parse(JSON.stringify(data)) 
        newState.calculatedPremium = res
        console.log('Calculated premium new state is: ' + JSON.stringify(newState))
        this.store.dispatch(actions.updateUserDataAct(newState));
      });
    }

    })

    
  }

  clearCard(event) {
    $(document.getElementsByClassName("homeInsurance")).removeClass("col-md-12");
    $(document.getElementsByClassName("homeInsurance")).addClass("col-md-4");
  }

}
