import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-tiles',
  templateUrl: './insurance-tiles.component.html',
  styleUrls: ['./insurance-tiles.component.css']
})
export class InsuranceTilesComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

  handleCardClick(){
    console.log("Card Clicked");
  }

  calculatePremium(){
      
  }

}
