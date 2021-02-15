import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalculatedPremium, UserData } from '../store/reducers/dashboardReducer';
import * as selectors from "../store/selectors/counterSelector";
import * as CounterSelector from "../store/selectors/counterSelector";
import * as $ from "jquery";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  newPremiumData$: Observable<any>;
  stateData$: Observable<any>;

  isDataAvailable = false;
  constructor(private store: Store<UserData>) {
    this.store.pipe(select(CounterSelector.selectUserData)).subscribe(storeData => {
      if (storeData != undefined || storeData != {}) {
        this.stateData$ = storeData
        this.isDataAvailable = true;
      }
    });
  }
  //= 0;

  prevHomeIns = 1100;
  prevLifeIns = 3200;
  prevAutoIns = 1100;

  WithoutHome = 4300;
  chart_lifePer = parseInt(((3200 / 5400) * 100).toString())
  chart_homePer = parseInt(((1100 / 5400) * 100).toString())
  chart_autoPer = parseInt(((1100 / 5400) * 100).toString())

  newPremium = 5400;
  prevLifePrem = 3200;

  ngOnInit(): void {

    //this.newPremium = 0;
    let WithoutHome = 4300;

    // setInterval(() => {
    WithoutHome = 4300;
    this.store.pipe(select(selectors.selectUserData)).subscribe((data) => {

      // console.log('Evnt occured.....')
      if (data != undefined && data != {}) {


        $('#chartHeaderID').children().remove();
        $('#chartBarsID').children().remove();
        for (let i = 0; i < data.cards.length; i++) {

          if (data.cards[i].isEnabled == true) {
            $('#chartHeaderID').append(`<th>${data.cards[i].name}</th>`);
      
            $('#chartBarsID')
              .append(`<td style="width: ${data.cards[i].percentOutOfTotPremium}%; height: 1.7rem; background-color: ${data.cards[i].color}; ">${data.cards[i].percentOutOfTotPremium}%</td>`)
          }


        }

        //   try {
        //     try {
        //       this.newPremium = (this.WithoutHome + parseInt(data.calculatedHomePremium.data.newPremium));
        //     } catch (e) {

        //     }


        //     try {

        //       this.prevLifePrem = data.calculatedLifePremium.data.newPremium.whole_life_insurance;
        //       this.newPremium = this.newPremium - this.prevLifePrem;
        //       this.newPremium = this.newPremium + data.calculatedLifePremium.data.newPremium.whole_life_insurance;
        //       this.chart_lifePer = parseInt(((data.calculatedLifePremium.data.newPremium.whole_life_insurance / this.newPremium) * 100).toString())


        //     } catch (error) {

        //       this.chart_lifePer = parseInt(((3200 / this.newPremium) * 100).toString())

        //     }

        //     this.chart_homePer = parseInt(((data.calculatedHomePremium.data.newPremium / this.newPremium) * 100).toString())
        //     this.chart_autoPer = parseInt(((1100 / this.newPremium) * 100).toString())

        //     $('#homeInsBar').css("width", (this.chart_homePer * 2).toString() + '%')
        //     $('#lifeInsBar').css("width", (this.chart_homePer * 2).toString() + '%')
        //     $('#autoInsBar').css("width", (this.chart_homePer * 2).toString() + '%')

        //     console.log("calculated % are : chart_lifePer :" + (this.chart_lifePer) + "chart_homePer : " + (this.chart_homePer) + " chart_autoPer:" + (this.chart_autoPer))

        //     WithoutHome = 0;
        //   } catch (e) {

        //   } finally {
        //   }
      }
    })
    // }, 1000)
  }
}
