import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";

@Component({
  selector: 'app-header-cards',
  templateUrl: './header-cards.component.html',
  styleUrls: ['./header-cards.component.css']
})
export class HeaderCardsComponent implements OnInit {

userData$ : Observable<any>;  
constructor(private store: Store<UserData>) {

  this.userData$  = store.pipe(select(CounterSelector.selectUserData));
 }


masterData = {
  "status": "success",
  "data": [
      {
          "_id": "6018fb6057065f3c046d014c",
          "product": "home",
          "state": "Texas",
          "zipcode_min": 73301,
          "zipcode_max": 88595,
          "dwelling_default": 300000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 3429
      },
      {
          "_id": "6018fb6057065f3c046d014d",
          "product": "home",
          "state": "California",
          "zipcode_min": 90001,
          "zipcode_max": 96162,
          "dwelling_default": 300000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 1139
      },
      {
          "_id": "6018fb6057065f3c046d014e",
          "product": "home",
          "state": "Pennsylvania",
          "zipcode_min": 15001,
          "zipcode_max": 19612,
          "dwelling_default": 200000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 801
      },
      {
          "_id": "6018fb6057065f3c046d014f",
          "product": "home",
          "state": "New York",
          "zipcode_min": 10001,
          "zipcode_max": 14905,
          "dwelling_default": 200000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 935
      },
      {
          "_id": "6018fb6057065f3c046d0150",
          "product": "home",
          "state": "Illinois",
          "zipcode_min": 60001,
          "zipcode_max": 62999,
          "dwelling_default": 100000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 706
      },
      {
          "_id": "6018fb6057065f3c046d0151",
          "product": "home",
          "state": "Florida",
          "zipcode_min": 32003,
          "zipcode_max": 34997,
          "dwelling_default": 300000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 3643
      },
      {
          "_id": "6018fb6057065f3c046d0152",
          "product": "home",
          "state": "Ohio",
          "zipcode_min": 43001,
          "zipcode_max": 45999,
          "dwelling_default": 300000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 2376
      },
      {
          "_id": "6018fb6057065f3c046d0153",
          "product": "home",
          "state": "Virginia",
          "zipcode_min": 20101,
          "zipcode_max": 24658,
          "dwelling_default": 291000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 1200
      },
      {
          "_id": "6018fb6057065f3c046d0154",
          "product": "home",
          "state": "Michigan",
          "zipcode_min": 48001,
          "zipcode_max": 49971,
          "dwelling_default": 200000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 1290
      },
      {
          "_id": "6018fb6057065f3c046d0155",
          "product": "home",
          "state": "Missouri",
          "zipcode_min": 63005,
          "zipcode_max": 65899,
          "dwelling_default": 100000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 1133
      },
      {
          "_id": "6018fb6057065f3c046d0156",
          "product": "home",
          "state": "North Carolina",
          "zipcode_min": 27006,
          "zipcode_max": 28909,
          "dwelling_default": 200000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 989
      },
      {
          "_id": "6018fb6057065f3c046d0157",
          "product": "home",
          "state": "Iowa",
          "zipcode_min": 50001,
          "zipcode_max": 52809,
          "dwelling_default": 100000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 1535
      },
      {
          "_id": "6018fb6057065f3c046d0158",
          "product": "home",
          "state": "Minnesota",
          "zipcode_min": 55001,
          "zipcode_max": 56763,
          "dwelling_default": 200000,
          "dwelling_min": "",
          "dwelling_max": "",
          "Premium": 1952
      }
  ]
};

  ngOnInit(): void {

  

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
