import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-cards',
  templateUrl: './header-cards.component.html',
  styleUrls: ['./header-cards.component.css']
})
export class HeaderCardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
