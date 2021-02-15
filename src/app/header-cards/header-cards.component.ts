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

  isStateDataSet = false;
  keyPress(event: any) {
    this.isStateDataSet = false;
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 5 && !pattern.test(inputChar)) {
      event.preventDefault();
    } else {
      let currZip = parseInt(($('#zipCodeInputField').val()))
      console.log('User input zip code is:' + currZip);
      if (currZip < 99999 && currZip > 10000) {
        var stateData = this.masterData.data.states.filter((item) => {
          return currZip >= item.zipcode_min && currZip <= item.zipcode_max
        })
        if (stateData.length == 0)
          alert("please provide valid zip")
        else {
          console.log('Found state from provided zip as :' + JSON.stringify(stateData[0]))

          this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
            if (this.isStateDataSet == false) {
              this.isStateDataSet = true;
              let index = data.cards.findIndex(obj => obj.key == 'home');
              let prevState = JSON.parse(JSON.stringify(data))
              prevState.cards[index].premium = stateData[0].Premium
              prevState.cards[index].coverage = stateData[0].dwelling_default
              prevState.cards[index].state_name = stateData[0].states
              this.store.dispatch(actions.updateUserDataAct({ data: prevState }));
              this.isTotalPremiumCalculated = false;
              this.calculateTotalPremium()
              
            }
          });

          // subscribedStore.unsubscribe(); 
        }
      }
    }
  }

  isTotalPremiumCalculated = false;
  calculateTotalPremium() {
    this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
      let totalPrem = 0;
      if (this.isTotalPremiumCalculated == false) {
        this.isTotalPremiumCalculated = true;
        for (let i = 0; i < data.cards.length; i++) {
          if (data.cards[i].isEnabled == true)
            totalPrem = totalPrem + data.cards[i].premium
        }

        let prevStateData = JSON.parse(JSON.stringify(data))
        prevStateData.totalPremium = totalPrem;
        this.store.dispatch(actions.updateUserDataAct({ data: prevStateData }));
      }

    });
  }


  masterData: any = {}

  ngOnInit(): void {

    console.log("In ngOnInit of header-cards.component.")
    this.services.getMasterData().subscribe((data) => {
      if (data["status"] == "success") {
        this.masterData = data;
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
    { name: '35-45' },
    { name: '45-55' }
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

  tempCounter = false;
  ageValueChange(counter) {

    let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

      if (this.tempCounter == false) {
        console.log("In ageValueChange with store data :: " + JSON.stringify(data))
        this.tempCounter = true;
        let ageData = JSON.parse(JSON.stringify(data))
        let ageBracket = this.age[counter].name

        let AgeBracketData = this.masterData.data.age.filter((item) => {
          return (item["Age "].replaceAll(" ", "") == ageBracket && item["Death Benefit"] == 250000);
        })
        //    ageData.age = AgeBracketData;
        //   this.store.dispatch(actions.updateUserDataAct({data : ageData}));

        let index = data.cards.findIndex(obj => obj.key == 'life');
        ageData.cards[index].premium = AgeBracketData[0].Premium
        ageData.cards[index].coverage = AgeBracketData[0]["Death Benefit"]
        ageData.cards[index].age = ageBracket

        this.store.dispatch(actions.updateUserDataAct({ data: ageData }));
        this.isTotalPremiumCalculated = false;
        this.calculateTotalPremium()
      }
      //subscription.unsubscribe();
    })
    subscription.unsubscribe();
  }


  dependentValueChange(counter) {
    let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

      var dependentValue = this.dependents[counter].name;
      console.log("Data is :" + JSON.stringify(data))

      console.log('New dependent value is: ' + JSON.stringify(dependentValue))
      this.store.dispatch(actions.updateUserDataAct({ data: dependentValue }));

      //subscription.unsubscribe();
    })
  }

  automobileValueChange(counter) {
    let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

      var automobileValue = this.automobile[counter].value;
      console.log("Data is :" + JSON.stringify(data))

      console.log('New automobile value is: ' + JSON.stringify(automobileValue))
      this.store.dispatch(actions.updateUserDataAct({ data: automobileValue }));

      // subscription.unsubscribe();
    })
  }

  ageincrement(event: any) {
    this.tempCounter = false
    // console.log("ageincrement called...")
    this.counter += 1;
    if (this.counter >= this.age.length) {
      this.counter = 0;
    }
    this.ageValueChange(this.counter);
  }

  agedecrement(event: any) {
    this.tempCounter = false
    //console.log("agedecrement called...")
    if (this.counter == 0) {
      this.counter = 2;
    }
    this.counter -= 1;
    this.ageValueChange(this.counter);
  }


  depedentincrement(event: any) {

    this.counter1 += 1;
    if (this.counter1 == this.dependents.length) {
      this.counter1 = 0;
    }
    this.dependentValueChange(this.counter1);
  }

  depedentdecrement(event: any) {

    if (this.counter1 == 0) {
      this.counter1 = 5;
    }
    this.counter1 -= 1;

    this.dependentValueChange(this.counter1);
  }

  automobileincrement(event: any) {

    this.counter2 += 1;
    if (this.counter2 >= this.automobile.length) {
      this.counter2 = 0;
    }

    this.automobileValueChange(this.counter2);
  }

  automobiledecrement(event: any) {

    if (this.counter2 == 0) {
      this.counter2 = 5;
    }
    this.counter2 -= 1;

    this.automobileValueChange(this.counter2);
  }

  incomeDropdown(value) {
    let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

      var incomeValue = this.Incomes[value].viewValue;
      console.log("Data is :" + JSON.stringify(data))

      console.log('New income value is: ' + JSON.stringify(incomeValue));
      this.store.dispatch(actions.updateUserDataAct({ data: incomeValue }));

      subscription.unsubscribe();
    })
  }

  statusDropdown(value) {
    let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

      var statusValue = this.Stat[value].viewValue;
      console.log("Data is :" + JSON.stringify(data))

      console.log('New status value is: ' + JSON.stringify(statusValue));
      this.store.dispatch(actions.updateUserDataAct({ data: statusValue }));

      subscription.unsubscribe();
    })
  }

  occupationDropdown(value) {
    let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {

      var occupationValue = this.Occupations[value].viewValue;
      console.log("Data is :" + JSON.stringify(data))

      console.log('New status value is: ' + JSON.stringify(occupationValue));
      this.store.dispatch(actions.updateUserDataAct({ data: occupationValue }));

      subscription.unsubscribe();
    })
  }


}
