import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalculatedPremium, UserData } from '../store/reducers/dashboardReducer';
import * as selectors from "../store/selectors/counterSelector";
import * as CounterSelector from "../store/selectors/counterSelector";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // UserData$: Observable<any>;
  stateData$: Observable<any>;

  isDataAvailable = false;
  constructor(private store: Store<UserData>) {
    
  }

  ngOnInit(): void {  
    this.store.pipe(select(CounterSelector.selectUserData)).subscribe(storeData => {
      if (storeData != undefined || storeData != {}) {
        this.stateData$ = storeData
        this.isDataAvailable = true;
      }
    });
  }

}
