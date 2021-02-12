import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

import { StoreModule } from '@ngrx/store'

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { FooterComponent } from './footer/footer.component';
import { createCounterReducer,createUserDataStateReducer, createNewPremiumDataStateReducer } from './store/reducers/dashboardReducer'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';

import { InsuranceTilesComponent } from './insurance-tiles/insurance-tiles.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { HeaderCardsComponent } from './header-cards/header-cards.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    InsuranceTilesComponent,
    HeaderCardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule,
    //StoreModule.forRoot({"counterState" : createCounterReducer}),
    StoreModule.forRoot({"userDataState" : createUserDataStateReducer}),
  //  StoreModule.forRoot({"newPremiumState" : createNewPremiumDataStateReducer}),
    StoreDevtoolsModule.instrument(),
    MatSlideToggleModule,
    MatCardModule,
    MatSelectModule,
    MatSliderModule,
    HttpClientModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
