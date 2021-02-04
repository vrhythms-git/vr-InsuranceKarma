import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";
import { IKServices } from "../services/app.service";
declare var $: any;


@Component({
  selector: 'app-insurance-tiles',
  templateUrl: './insurance-tiles.component.html',
  styleUrls: ['./insurance-tiles.component.css']
})
export class InsuranceTilesComponent implements OnInit {

  userData$: Observable<any>;
  InsuranceData : any;
  SliderData: any = { };
  insuranceType : any;

  constructor(private store: Store<UserData>, private ikservice:IKServices) {

    this.userData$ = store.pipe(select(CounterSelector.selectUserData));
  }

  ngOnInit(): void {
  }

  handleCardClick(event) {
    this.insuranceType = event.currentTarget.id;
    this.userData$.subscribe((data) => {
      console.log("new state data : " + JSON.stringify(data));
    })
    $(document).ready(function () {
      $(document.getElementById('homeInsurance')).removeClass('col-md-4');
      $(document.getElementById('homeInsurance')).addClass('col-md-12');
    })
  }

  onInputChange({event, id}) {
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
    this.InsuranceData = ({type:this.insuranceType,sliderData:this.SliderData});
    console.log("insurance data: " + JSON.stringify(this.InsuranceData))
    //this.ikservice.postInsuranceData(this.InsuranceData);
  }

  clearCard(event) {
    $(document.getElementsByClassName("homeInsurance")).removeClass("col-md-12");
    $(document.getElementsByClassName("homeInsurance")).addClass("col-md-4");
  }

}
