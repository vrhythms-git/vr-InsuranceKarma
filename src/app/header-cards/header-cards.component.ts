import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";
import { IKServices } from "../services/app.service"

@Component({
  selector: 'app-header-cards',
  templateUrl: './header-cards.component.html',
  styleUrls: ['./header-cards.component.css']
})
export class HeaderCardsComponent implements OnInit {

userData$ : Observable<any>;  
constructor(private store: Store<UserData>, private services: IKServices) {

  this.userData$  = store.pipe(select(CounterSelector.selectUserData));
 }



masterData:any = {}

  ngOnInit(): void {

console.log("In ngOnInit of header-cards.component.")
this.services.getMasterData().subscribe((data) =>{
  if(data["status"] == "success"){
      this.masterData = data;
  }
})

  }

  handleStateChange(event){
     // let value = event.source.value; 
      this.store.dispatch(actions.updateUserDataAct({data: event.source.value}));
  }

  selected1 = 'New York';
  selected = '60k-70k';
  selected2 = 'Married';
  selected3 = 'Service'

  public counter : number = 1;
  public counter1 : number = 1;
  public counter2 : number = 1;
    increment(){
      this.counter += 1;
    }
    
    decrement(){
      this.counter -= 1;
    }


    increment1(){
      this.counter1 += 1;
    }
    
    decrement1(){
      this.counter1 -= 1;
    }

    increment2(){
      this.counter2 += 1;
    }
    
    decrement2(){
      this.counter2 -= 1;
    }

    
    
}
