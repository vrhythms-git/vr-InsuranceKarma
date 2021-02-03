import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";


@Component({
  selector: 'app-insurance-tiles',
  templateUrl: './insurance-tiles.component.html',
  styleUrls: ['./insurance-tiles.component.css']
})
export class InsuranceTilesComponent implements OnInit {

  userData$ : Observable<any>;  
constructor(private store: Store<UserData>) {

  this.userData$  = store.pipe(select(CounterSelector.selectUserData));
 }

  ngOnInit(): void {
  }

  handleCardClick(){
    this.userData$.subscribe((data)=>{
      console.log("new state data : " + data);   
    })
   
  }

  calculatePremium(){

  }

}
