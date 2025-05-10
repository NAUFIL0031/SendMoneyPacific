import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse,HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment'
// import { environment } from 'src/environments/environment.prod';
declare var cordova:any;
@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
 
private BASE_API = environment.BASE_API
private API_KEY = environment.API_KEY;

  constructor(private http: HttpClient, private platform:Platform) {}

  // --------- login --------

   login(formData: any){
    // const headers = new HttpHeaders({
    //   'apikey': `${environment.API_KEY}`, // Set API key in headers
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Authorization': 'application: token' // Added Authorization header
    // });
 
    // const options = {
    //   method: 'post',
    //   data: {username:'naufil.s@techmanha.com',password:'123nAUFIL#@!'},
    //   headers: { Authorization: 'application: token', apikey:`${environment.API_KEY}`, Accoet:'application/json'}
    // };
    // console.log('52415')
    // cordova['plugin'].http.sendRequest( `${this.BASE_API}/login?`,(response:any)=> {
    //   // prints 200
      
    //   console.log(response.status);
    // }, (response:any) =>{
    //   // prints 403
    //   console.log(response.status);
    
    //   //prints Permission denied
    //   console.log(response.error);
    // });

    
    // cordova['plugin'].http.post(
    //   `${this.BASE_API}/login`,
    //   formData,
    //   { apikey: this.API_KEY },
    //   async (response:any) => {
    //     console.log('Login Response:', response);

  
  //  return true;
}


 

                  //GET Method
                  
  // contactUs(params: any): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'apikey': `${environment.API_KEY}`, // Set API key in headers
  //     'Accept': 'application/json'
  //   });
  
  //   // Convert object to query parameters
  //   const queryParams = new URLSearchParams(params).toString();
  
  //   return this.http.get(`${this.BASE_API}/login?${queryParams}`, { headers });
  // }
  // getExchangeRates(): Observable<any> {
  //   return this.http.get<any>(this.API_KEY);
  // }
}
