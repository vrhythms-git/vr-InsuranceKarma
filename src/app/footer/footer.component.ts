import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CalculatedPremium } from '../store/reducers/dashboardReducer';
import * as selectors from "../store/selectors/counterSelector";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  newPremiumData$: Observable<any>;
  constructor(private store: Store<CalculatedPremium>) {

    this.newPremiumData$ = store.pipe(select(selectors.selectNewPremiumData));
   }

  ngOnInit(): void {
  }

}
