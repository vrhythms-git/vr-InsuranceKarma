import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CounterState, UserData } from '../store/reducers/dashboardReducer';
import * as actions from '../store/actions/dashboardAction'
import * as CounterSelector from "../store/selectors/counterSelector";
import { IKServices } from "../services/app.service"
import * as $ from "jquery";




interface Occupation {
  value: string;
  viewValue: string;
}

interface Status {
  value: string;
  viewValue: string;
}

interface Income {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-header-cards',
  templateUrl: './header-cards.component.html',
  styleUrls: ['./header-cards.component.css']
})
export class HeaderCardsComponent implements OnInit {

  userData$: Observable<any>;
  constructor(private store: Store<UserData>, private services: IKServices) {
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 5 && !pattern.test(inputChar)) {
        event.preventDefault();
      } else{
      let currZip = parseInt(($('#zipCodeInputField').val()))
      console.log('User input zip code is:' + currZip);
      if(currZip < 99999 && currZip > 10000){
      var stateData = this.masterData.data.states.filter((item) => {
        return currZip >= item.zipcode_min && currZip <= item.zipcode_max
      })
      if (stateData.length == 0)
        alert("please provide valid zip")
        else{
          console.log('Found state from provided zip as :' + JSON.stringify(stateData[0]))
          this.store.dispatch(actions.updateUserDataAct({data : stateData[0]}));
        }
      }
    }
    
  }

  masterData: any = {}

  ngOnInit(): void {

    console.log("In ngOnInit of header-cards.component.")
    this.services.getMasterData().subscribe((data) => {
      if (data["status"] == "success") {
        this.masterData = data["states"];
      }
    })

  }

  prevValue = "";

  handleStateChange(event) {

    if (event.isUserInput == false) return;
    let payloadToDispatch = { data: event.source.value }
    this.store.dispatch(actions.updateUserDataAct(payloadToDispatch));

  }

 age = [
    {name: '25-35' },
    {name: '36-45'},
    {name: '46-55'},
    {name: '56-65'}
];

  dependents = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' }
  ];


  automobile = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' }
  ];


  Occupations: Occupation[] = [
    { value: '0', viewValue: 'Employed' },
    { value: '1', viewValue: 'Self-Employed' },
    { value: '2', viewValue: 'Student' },
    { value: '3', viewValue: 'Retired' }
  ];

  selectedOccupation = this.Occupations[0].value;


  Stat: Status[] = [
    { value: '0', viewValue: 'Married' },
    { value: '1', viewValue: 'UnMarried' },

  ];
  selectedStatus = this.Stat[0].value;

  Incomes: Income[] = [
    { value: '0', viewValue: '30k-40k' },
    { value: '1', viewValue: '41k-50k' },
    { value: '2', viewValue: '51k-60k' },
    { value: '3', viewValue: '61k-70k' },
    { value: '4', viewValue: '71k-80k' },
    { value: '5', viewValue: '81k-90k' }
  ];
  selectedIncome = this.Incomes[0].value;


  public counter: number = 0;
  public counter1: number = 0;
  public counter2: number = 0;
  ageincrement() {
    this.counter += 1;
    if (this.counter >= this.age.length) {
      this.counter = 0;
    }


  }

  agedecrement() {
    if (this.counter == 0) {
      this.counter = 5;
    }
    this.counter -= 1;
  }


  depedentincrement() {
    this.counter1 += 1;
    if (this.counter1 == this.dependents.length) {
      this.counter1 = 0;
    }

  }

  depedentdecrement() {
    if (this.counter1 == 0) {
      this.counter1 = 5;
    }
    this.counter1 -= 1;
  }

  automobileincrement() {
    this.counter2 += 1;
    if (this.counter2 >= this.automobile.length) {
      this.counter2 = 0;
    }
  }

  automobiledecrement() {
    if (this.counter2 == 0) {
      this.counter2 = 5;
    }
    this.counter2 -= 1;
  }


}
