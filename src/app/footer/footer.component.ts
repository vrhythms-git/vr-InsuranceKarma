import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalculatedPremium, UserData } from '../store/reducers/dashboardReducer';
import * as selectors from "../store/selectors/counterSelector";
import * as $ from "jquery";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  newPremiumData$: Observable<any>;
  constructor(private store: Store<UserData>) {



  }
  //= 0;

  prevHomeIns = 1100;
  WithoutHome = 4300;
  chart_lifePer = parseInt(((3200 / 5400) * 100).toString())
  chart_homePer = parseInt(((1100 / 5400) * 100).toString())
  chart_autoPer = parseInt(((1100 / 5400) * 100).toString())

  newPremium = 5400;
  prevLifePrem = 3200;

  ngOnInit(): void {

    //this.newPremium = 0;
    let WithoutHome = 4300;

    setInterval(() => {
      WithoutHome = 4300;
      let subscribed = this.store.pipe(select(selectors.selectUserData)).subscribe((data) => {
        // console.log('New Premium Data from ngrx in footer is ' + JSON.stringify(data))
        if (data != undefined && data != {}) {
          try {
            // if(this.prevHomeIns !=  data.calculatedPremium.data.newPremium)
            //     this.prevHomeIns = data.calculatedPremium.data.newPremium;
            // else 
            try {
              this.newPremium = (this.WithoutHome + parseInt(data.calculatedHomePremium.data.newPremium));
            } catch (e) {

            }


            try {

              this.prevLifePrem = data.calculatedLifePremium.data.newPremium.whole_life_insurance;
              this.newPremium = this.newPremium - this.prevLifePrem;
              this.newPremium = this.newPremium + data.calculatedLifePremium.data.newPremium.whole_life_insurance;
              this.chart_lifePer = parseInt(((data.calculatedLifePremium.data.newPremium.whole_life_insurance / this.newPremium) * 100).toString())


            } catch (error) {

              this.chart_lifePer = parseInt(((3200 / this.newPremium) * 100).toString())

            }
            //this.newPremium = (this.WithoutHome + parseInt(data.calculatedHomePremium.data.newPremium));
            this.chart_homePer = parseInt(((data.calculatedHomePremium.data.newPremium / this.newPremium) * 100).toString())
            this.chart_autoPer = parseInt(((1100 / this.newPremium) * 100).toString())

            $('#homeInsBar').css("width", (this.chart_homePer * 2).toString() + '%')
            $('#lifeInsBar').css("width", (this.chart_homePer * 2).toString() + '%')
            $('#autoInsBar').css("width", (this.chart_homePer * 2).toString() + '%')

            console.log("calculated % are : chart_lifePer :" + (this.chart_lifePer) + "chart_homePer : " + (this.chart_homePer) + " chart_autoPer:" + (this.chart_autoPer))

            WithoutHome = 0;
          } catch (e) {

          } finally {
            // subscribed.unsubscribe()
          }
        }
      })
    }, 1000)
  }
}
