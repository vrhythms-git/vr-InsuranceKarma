import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState } from '../store/reducers/dashboardReducer';
import * as counterActions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";
import { trigger, state, style, transition, animate, group } from '@angular/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('divState',[
      state('yellowbox',style({
        backgroundColor:'yellow',
        transform:'translateX(0) scale(0.5)'
      })),
      state('redbox',style({
        backgroundColor:'red',
        transform:'translateX(200px) scale(3)'
      })),
      transition('yellowbox => redbox',animate(200)),
      transition('redbox => yellowbox',animate(200)),

    ])
  ]
})



export class DashboardComponent implements OnInit {

  counter$ : Observable<number>;

  stateName='yellowbox'

   switchState(){
    this.stateName = this.stateName === 'yellowbox' ? 'redbox' : 'yellowbox'
   }  

  constructor(private store: Store<CounterState>) {

    this.counter$  = store.pipe(select(CounterSelector.selectCounter));
   }

  ngOnInit(): void {
  }

  decrement(){
    this.store.dispatch(counterActions.decrementAct())
    console.log('Counter is :: ' + this.counter$)
  }

  increment(){
    this.store.dispatch(counterActions.incrementAct())
    console.log('Counter is :: ' +this.counter$)
  }

}
