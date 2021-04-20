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
    // this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
    //   let state = JSON 
    // });
  }

  isStateDataSet = false;
  keyPress(event: any) {
    this.isStateDataSet = false;
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 5 && !pattern.test(inputChar)) {
      event.preventDefault();
      if (event.keyCode == 13){
        this.change(event);
      }
    } 
  }

  change(event: any) {
    this.isStateDataSet = false;
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

              prevState.cards[index].oldPremium = stateData[0].Premium
              prevState.cards[index].oldCoverage = stateData[0].dwelling_default

              prevState.cards[index].sqft_price = stateData[0].sqft_price

              prevState.cards[index].oldNewPremChangeInPercent =  0;
              prevState.cards[index].oldNewPremChangeInValue = 0;
              prevState.cards[index].risk = "";
              
              // prevState.cards[index].oldPremium = stateData[0].Premium
              // prevState.cards[index].OldCoverage = stateData[0].dwelling_default

              prevState.cards[index].state_name = stateData[0].states


              // Start change (Rahul sir 18-2-20)
              prevState.default_home_dwelling = stateData[0].dwelling_default;
              prevState.default_home_premium = stateData[0].Premium;
              prevState.default_home_coverage = stateData[0].dwelling_default;
              prevState.hasStateChanged = "true";
              //Change for auto card
              let index2 = data.cards.findIndex(obj => obj.key == 'auto');
              prevState.cards[index2].premium = stateData[0].auto_premium
              prevState.cards[index2].coverage = 50000
              prevState.cards[index2].oldPremium = stateData[0].auto_premium
              prevState.cards[index2].oldCoverage = 50000
              prevState.cards[index2].risk = "";
              prevState.cards[index2].defaultPremium = stateData[0].auto_premium

              prevState = this.reCalculateTotalPremium(prevState)
              prevState = this.reCalculatePercentages(prevState);
            
             prevState.oldNewTotalPremChangeInPercent =  (((prevState.totalPremium - prevState.oldTotalPremium) / prevState.oldTotalPremium) * 100).toFixed(1)
             prevState.oldNewTotalPremChangeInValue = prevState.totalPremium - prevState.oldTotalPremium;
                            
              prevState.cards[index2].oldNewPremChangeInPercent =  0;
              prevState.cards[index2].oldNewPremChangeInValue = 0;
                      
              // End change
              this.store.dispatch(actions.updateUserDataAct({ data: prevState }));
             // this.isTotalPremiumCalculated = false;
             // this.calculateTotalPremium(index, stateData[0].Premium);
              
            }
          });

          // subscribedStore.unsubscribe(); 
        }
      }
    }
  

  reCalculateTotalPremium(stateJson) {

    let totalPrem = 0;
    let oldTotalPremium = 0;

    // for (let i = 0; i < 6; i++) {
    //   if (stateJson.cards[i].isEnabled == true)
    //     totalPrem = totalPrem + stateJson.cards[i].premium
    // }

    // stateJson.totalPremium = totalPrem;
    // return stateJson;

    for (let i = 0; i < 6; i++) {
      if (stateJson.cards[i].isEnabled == true){
        totalPrem = totalPrem + stateJson.cards[i].premium
        oldTotalPremium = oldTotalPremium + stateJson.cards[i].oldPremium
      }
    }

    stateJson.totalPremium = totalPrem;
    stateJson.oldTotalPremium = oldTotalPremium;
    return stateJson;
  }
  
  isTotalPremiumCalculated = false;
  calculateTotalPremium(cardIndex, premium) {
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
       // prevStateData.cards[cardIndex].percentOutOfTotPremium = parseInt(((premium / totalPrem) * 100).toString()) 
       prevStateData = this.reCalculatePercentages(prevStateData)
        this.store.dispatch(actions.updateUserDataAct({ data: prevStateData }));
      }

    });
  }

  reCalculatePercentages(prevStateData){

    let totalPremium = prevStateData.totalPremium;

    for (let i = 0; i < prevStateData.cards.length; i++) {
      if (prevStateData.cards[i].isEnabled == true)
      prevStateData.cards[i].percentOutOfTotPremium =  ((prevStateData.cards[i].premium / totalPremium) * 100).toFixed(1)
    }

    return prevStateData;
  }

  masterData: any = {}

  ngOnInit(): void {

    // document.getElementById('loading') 
    // .style.display = 'none'; 

    console.log("In ngOnInit of header-cards.component.")
    this.services.getMasterData().subscribe((resData) => {
      if (resData["status"] == "success") {
        this.masterData = resData;
        this.change('');
       // let appMasterData= {};
      
          // this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
          //     let prevState = JSON.parse(JSON.stringify(data));
          //     prevState.masterData.stateData = resData["data"].states; 
          //     prevState.masterData.ageData = resData["data"].age;
          //     this.store.dispatch(actions.updateUserDataAct({data : prevState}));
          // });
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
    { value: '0', viewValue: '25k-50k' },
    { value: '1', viewValue: '51k-100k' },
    { value: '2', viewValue: '101k-125k' },
    { value: '3', viewValue: '126k-150k' },
    { value: '4', viewValue: '151k-175k' },
    { value: '5', viewValue: '176k-200k' }
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
            return (item["Age "].replace(/ /g,"") == ageBracket && item["Death Benefit"] == 250000);
          })
        
        //    ageData.age = AgeBracketData;
        //   this.store.dispatch(actions.updateUserDataAct({data : ageData}));

        let index = data.cards.findIndex(obj => obj.key == 'life');
        ageData.cards[index].premium = AgeBracketData[0].Premium
        ageData.cards[index].coverage = AgeBracketData[0]["Death Benefit"]
        ageData.cards[index].oldPremium = AgeBracketData[0].Premium
        ageData.cards[index].oldCoverage = AgeBracketData[0]["Death Benefit"]
        ageData.cards[index].age = ageBracket

        ageData.cards[index].risk = "";
        // ageData.cards[index].oldPremium = AgeBracketData[0].Premium
        // ageData.cards[index].oldCoverage = AgeBracketData[0]["Death Benefit"]
        ageData.selectedAgeBracket  = this.masterData.data.age.filter((item) => {
          return (item["Age "].replace(/ /g,"") == ageBracket);
        })

        // Start change (Rahul sir 18-2-20)
        ageData.default_life_premium = AgeBracketData[0].Premium;
        ageData.default_life_coverage = AgeBracketData[0]["Death Benefit"];
        // End change
        ageData = this.reCalculateTotalPremium(ageData)
        ageData = this.reCalculatePercentages(ageData);

        ageData.oldNewTotalPremChangeInPercent =  (((ageData.totalPremium - ageData.oldTotalPremium) / ageData.oldTotalPremium) * 100).toFixed(1)
        ageData.oldNewTotalPremChangeInValue = ageData.totalPremium - ageData.oldTotalPremium;

        ageData.cards[index].oldNewPremChangeInPercent =  0;
        ageData.cards[index].oldNewPremChangeInValue = 0;

        // if(ageData.cards[index].oldNewPremChangeInPercent !=  0){

          //ageData.oldNewTotalPremChangeInPercent =  parseInt((((ageData.totalPremium - ageData.oldTotalPremium) / ageData.oldTotalPremium) * 100).toString())
        //ageData.oldNewTotalPremChangeInValue = ageData.totalPremium - ageData.oldTotalPremium;
        // }

      this.store.dispatch(actions.updateUserDataAct({ data: ageData }));

       // this.isTotalPremiumCalculated = false;
        //this.calculateTotalPremium(index, AgeBracketData[0].Premium);
        // this.calculateTotalPremium()
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


  isincremented = false;
  automobileValueChange(counter) {
    this.isincremented = false;

    let subscription = this.store.pipe(select(CounterSelector.selectUserData)).subscribe((data) => {
      if (this.isincremented == false) {
        this.isincremented = true;
        let previousState = JSON.parse(JSON.stringify(data));
        previousState.cards[2].nosOfAutos = this.automobile[counter].value;

          let noOfauto = parseInt(this.automobile[counter].value + "");
          let newPremium = parseInt((( previousState.cards[2].defaultPremium * noOfauto) - (previousState.cards[2].defaultPremium * ((noOfauto - 1) * 0.1))).toFixed(0))
        
          previousState.cards[2].premium = newPremium;
          previousState.cards[2].oldPremium = newPremium;
          previousState.cards[2].risk = "";
          previousState = this.reCalculateTotalPremium(previousState)
          previousState = this.reCalculatePercentages(previousState);
  
          previousState.oldNewTotalPremChangeInPercent =  (((previousState.totalPremium - previousState.oldTotalPremium) / previousState.oldTotalPremium) * 100).toFixed(1)
          previousState.oldNewTotalPremChangeInValue = previousState.totalPremium - previousState.oldTotalPremium;
  
          // previousState.cards[index].oldNewPremChangeInPercent =  0;
          // previousState.cards[index].oldNewPremChangeInValue = 0;

        this.store.dispatch(actions.updateUserDataAct({ data: previousState }));
      }
    })
    subscription.unsubscribe();
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
    //this.dependentValueChange(this.counter1);
  }

  depedentdecrement(event: any) {

    if (this.counter1 == 0) {
      this.counter1 = 5;
    }
    this.counter1 -= 1;

    //this.dependentValueChange(this.counter1);
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
