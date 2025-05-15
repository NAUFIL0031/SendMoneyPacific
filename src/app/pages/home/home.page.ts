import { Component, OnInit } from '@angular/core';
import { IonicModule, NavParams, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';



declare let cordova: any; // Declare Cordova globally

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  private BASE_API = environment.BASE_API;
  private API_KEY = environment.API_KEY;


  destination:any[] = [];
  operators: any[] = [];
  selectedCountryCode = 'au'; // default
  selectedSenderCode: string = '';   // For AU/NZ
  selectedReceiverCode: string = ''; // For receiver countries
  title :any;
  id:any;
  Image:any;
  
 

  constructor( private router: Router, private location: Location, private http: HttpClient, private platform: Platform) {}

  ngOnInit() {
  //  console.log('Hcatid',this.id);
  //  console.log('Hcatimg',this.Image);

  }

  navigateToHome() {
    this.router.navigate(['/home']);
   
  }

  navigateToFolder() {

    this.router.navigate(['/folder/inbox']);
  }
 

   //fetch country icon and img

  getImageUrl(flag: string): string {
    return `https://test.sendmoneypacific.org/wp-content/uploads/flags/${flag}`;
  }
 
 //getInitial API

 getresult(){
  this.router.navigate(['/folder/inbox'])
}

  selectCountry(countryCode: string, title: string, flagUrl: string) {
    if (countryCode === 'au' || countryCode === 'nz') {
      this.selectedSenderCode = countryCode;  
      localStorage.setItem('countryCode',countryCode );
      localStorage.setItem('SelectedSenderCode',countryCode );
      
      
    }
  //  console.log("abcCountry : ",countryCode);

    //reciver country 

    localStorage.setItem('selectedCountryCode', countryCode);
    localStorage.setItem('selectedCountryTitle', title);
    localStorage.setItem('selectedCountryName', title); //

    const selectedCountryTitle = localStorage.getItem('selectedCountryTitle')
    // console.log('selectedCountryTitle : ', title); //SAME 
    console.log('selected Country: ', selectedCountryTitle);//
    localStorage.setItem('selectedCountryFlag', flagUrl);
 
    // console.log('Selected Country Code:', countryCode);
    console.log('Selected Country Title:', title);


    const requestData = {apikey : this.API_KEY};
    const headers = {
      'apikey':this.API_KEY,
      'Content-type':'application/json'
    };

    cordova.plugin.http.setDataSerializer('json');
    
    this.operators = [];
    cordova.plugin.http.post(
      `${this.BASE_API}/getInitialData`,
      requestData,
      headers,
      (response:any) => {
        try{

          //data
          const data = JSON.parse(response.data);
          console.log('initial data:',data);
          //destination
          this.destination = data.destination;
          console.log('initial data destination:',data.destination); 
          //operator
          this.operators = data.operators;
          console.log('operators:',data.operators);
//
          // data.foreach((item:any) => {
          //   this.operators.push({
          //     operators : item.operators,
          // });

//           console.log('Opearator result : ',data.result) //show result
//         });
// //       
          
          this.router.navigate(['/folder/inbox'], {
            queryParams: {
              countryCode: countryCode,
              countryName: title,
              flagUrl: flagUrl,
              operators :  JSON.stringify(data.operators),
              // image : optimage,
              apiData: JSON.stringify(data.destination) // if not using localStorage
            }
            
          });
        }
        catch (error) {
          console.error('Error Parsing API response:',error)
        }
        },
      (error :any) =>{
        console.error('API Error',error);
        alert('Failed to fetch Data...');
      }
    );
  }
}

