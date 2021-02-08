import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalculatedPremium, UserData } from '../store/reducers/dashboardReducer';
import * as selectors from "../store/selectors/counterSelector";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  newPremiumData$: Observable<any>;
  constructor(private store: Store<UserData>) {



  }
  newPremium = 0;
  ngOnInit(): void {

    setInterval(()=>{
    let subscribed = this.store.pipe(select(selectors.selectUserData)).subscribe((data) => {
     // console.log('New Premium Data from ngrx in footer is ' + JSON.stringify(data))
      if (data != undefined && data != {}) {
        try{
        this.newPremium = data.calculatedPremium.data.newPremium;
      }catch(e){

      }finally{
       // subscribed.unsubscribe()
      }
      }
    })
  },500)
  }
}
