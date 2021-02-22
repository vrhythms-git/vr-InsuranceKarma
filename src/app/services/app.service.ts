import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IKServices {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    private _baseUrl = "https://insurancekarma.herokuapp.com/";
    //private _baseUrl = 'http://localhost:8081';

    getMasterData() {
        console.log(`getMasterData() called`)
        // let headerObj = new HttpHeaders({
        //                                   'Authorization': localStorage.getItem('cormUserTokenId')!,
        //                                   'Content-Type' : 'application/json'
        //                                 });
        //   console.log('headers set to ' + JSON.stringify(headerObj))
        return this.http.get(`${this._baseUrl}/getMasterData`);
    }


    postInsuranceData(payloadJson: any){
        console.log('postInsuranceData() called.')

        let headerObj = new HttpHeaders({
            'Content-Type' : 'application/json'
          });
    
        return this.http.post<any>(`${this._baseUrl}/getPremium`, payloadJson,{ headers: headerObj });
    }

    // createUser(data:any): Observable<IUser[]> {

    //   let payloadJson = {
    //                         "email": data.email,
    //                         "password": data.pwd,
    //                         "displayName": data.fname +" "+data.lname,
    //                         "photoURL": "http://fake.photo"
    //                   }	
    // //"phoneNumber": "+910000000000",
    //                   console.log('Payload JSON : ' + JSON.stringify(payloadJson));

    //   return this.http.post<IUser[]>(this.signupurl, payloadJson);
    // }

    //   userSignIn(data:any): Observable<IUser[]> {

    //     let payloadJson = {
    //       "email": data.email,
    //       "password": data.pwd 
    //     }
    // console.log('Attempting to sign in using data : ' + JSON.stringify(payloadJson))
    //     return this.http.post<IUser[]>(this.signinurl, payloadJson);
    //   }

}
