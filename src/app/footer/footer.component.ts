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

  totalPremPercentChangeFormatter(percentage){
    if(percentage == 0){
     // return '--no change'
     return "";
     
    }else {
     return percentage + '%';
  }
  }

  totalPremValueChangeFormatter(value){
    if(value == 0){
      return ''
    }else{
      let formattedAmount = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
      return `$${formattedAmount}`
    }
  }

  showArrowBasedOnChange(value){
    if(value == 0){
      return ''
    }else if(value < 0){
      return 'arrow_downward'
    }else if(value > 0){
      return 'arrow_upward'
    }
  }

  ngOnInit(): void {

  setInterval(()=>{

   var suscribed =  this.store.pipe(select(CounterSelector.selectUserData)).subscribe(storeData => {
      if (storeData != undefined || storeData != {}) {
        this.stateData$ = storeData
        this.isDataAvailable = true;
      }
    });
    suscribed.unsubscribe()

  },200)

    
    this.store.pipe(select(selectors.selectUserData)).subscribe((data) => {
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
      }
    })
  }
}
