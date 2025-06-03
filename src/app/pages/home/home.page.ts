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

// selectedSenderCode = '';
selectedSenderTitle = '';
selectedSenderFlag = '';

// selectedReceiverCode = '';
selectedReceiverTitle = '';
selectedReceiverFlag = '';
selectedOperators: any[] = [];

  destination:any[] = [];
  operators: any[] = [];
  // selectedCountryCode = ''; // default
  selectedSenderCode: string = '';   // For AU/NZ
  selectedReceiverCode: string = ''; // For receiver countries
  title :any;
  id:any;
  Image:any;
  
 
 
  constructor( private router: Router, private location: Location, private http: HttpClient, private platform: Platform) {
   
  }

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
/*------------------------------------------------------------------------------------------------------------------------------------------*/ 
//  getresult(){
//   this.router.navigate(['/folder/inbox'])
  
// }


//   selectCountry(countryCode: any, title: string, flagUrl: string) {
      
//     // if (this.selectedSenderCode === 'au' || this.selectedSenderCode === 'nz') {
      
//     //   this.selectedSenderCode = countryCode;  
//     //   console.log("kddjd:",this.selectedSenderCode);
//     //   localStorage.setItem('countryCode',countryCode );
//     //   localStorage.setItem('SelectedSenderCode',this.selectedSenderCode );   
//     // }
    
//     //     const sle =   localStorage.setItem('selectedCountryCode', countryCode);
//     //       localStorage.setItem('countryCode',countryCode );
//     //   const country_from = JSON.stringify(localStorage.getItem('selectedCountryCode') ||'');
//     //   console.log("country_from",country_from)//
  
//     // localStorage.setItem('selectedCountryTitle', title);
//     // localStorage.setItem('selectedCountryName', title); //

//     // const RecevieCountryTitle = localStorage.getItem('RecevieCountryTitle')
//     // // console.log('selectedCountryTitle : ', title); //SAME 
//     // console.log('selected Reciver Country: ', RecevieCountryTitle);//
//     // localStorage.setItem('selectedCountryFlag', flagUrl);
 
//     // console.log('Selected Country Code:', countryCode);
//     // console.log('Selected Country Title:', title); //
  
    
//   //  console.log("abcCountry : ",countryCode);

//     //reciver country 

// localStorage.setItem('selectedCountryCode',countryCode);

// localStorage.setItem('countryCode',countryCode); //sender code
// localStorage.setItem('selectedCountryTitle',title);
// localStorage.setItem('selectedCountryName',title); //for receiver
// localStorage.setItem('selectedCountryFlag',flagUrl);

// const selectedCode = localStorage.getItem('selectedCountryCode') || '';
// const receiverTitle = localStorage.getItem('RecevieCountryTitle');

// console.log("Stored selectedCountryCode:", selectedCode);
//  console.log("Receiver Country Title:", receiverTitle);

//  //receiver country click



//     const requestData = {apikey : this.API_KEY};
//     const headers = {
//       'apikey':this.API_KEY,
//       'Content-type':'application/json'
//     };

//     cordova.plugin.http.setDataSerializer('json');
    
//     this.operators = [];
//     cordova.plugin.http.post(
//       `${this.BASE_API}/getInitialData`,
//       requestData, 
//       headers,
//       (response:any) => {
//         try{

//           //data
//           const data = JSON.parse(response.data);   
//           console.log('initial data:',data);
//           //destination
//           this.destination = data.destination;
//           console.log('initial data destination:',data.destination); 
//           //operator
//           this.operators = data.operators;
//           console.log('operators:',data.operators);

//           console.log("operatorssss:",this.operators);
// //
//           // data.foreach((item:any) => {
//           //   this.operators.push({
//           //     operators : item.operators,
//           // });

// //           console.log('Opearator result : ',data.result) //show result
// //         });
// // //           
//  console.log("Selected Country Code:", countryCode);

          
//           this.router.navigate(['/folder/inbox'], {
//             queryParams: {
//               countryCode: countryCode,
//               countryName: title,
//               flagUrl: flagUrl,
//               operators :  JSON.stringify(data.operators),
//               // image : optimage,
//               apiData: JSON.stringify(data.destination) // if not using localStorage
//             }
            
//           });
//         }
//         catch (error) {
//           console.error('Error Parsing API response:',error)
//         }
//         },
//       (error :any) =>{
//         console.error('API Error',error);
//         alert('Failed to fetch Data...');
//       }
//     );
//   }
//   selectReceiverCountry(countryCode :any, countryTitle : string, flgUrl : string){
//     console.log("Select receiver country :",countryCode);
//     console.log("Select receiver operator :",this.operators);
//     const destCode = this.operators;
//     if(destCode === countryCode){
//       alert("abc")
//     }

//     localStorage.setItem('selectcountrycode',countryCode);
//     alert(countryCode);
//   }

/**---------------------------------------------------------------------------------- */

//select country data

selectCountry(code: string, title: string, flagUrl: string) {


  this.selectedSenderCode = code;
  this.selectedSenderTitle = title;
  this.selectedSenderFlag = flagUrl;
console.log("select sender Country : ",this.selectedSenderCode,this.selectedReceiverTitle,this.selectedSenderFlag)
  localStorage.setItem('selectedSenderCode', code);
  localStorage.setItem('selectedSenderTitle', title);
  localStorage.setItem('selectedSenderFlag', flagUrl);

  const requestData = { apikey: this.API_KEY };
  const headers = {
    'apikey': this.API_KEY,
    'Content-type': 'application/json'
  };

  cordova.plugin.http.setDataSerializer('json');

  cordova.plugin.http.post(
    `${this.BASE_API}/getInitialData`,
    requestData,
    headers,
    (response: any) => {
      try {
        const data = JSON.parse(response.data);
        console.log("Inital Data:",data);

        this.destination = data.destination;
        console.log("Destination Data:",this.destination);

        this.operators = data.operators;
        console.log("Operator Data:",this.operators);
        
      } catch (error) {
        console.error('Error parsing response:', error);
      }
    },
    (error: any) => {
      console.error('API Error:', error);
      alert('Failed to fetch data...');
    }
  );
}




//reciver country data

selectReceiverCountry(id: string, title: string, flagUrl: string) {
 
  this.selectedReceiverCode = id;
  this.selectedReceiverTitle = title;
  this.selectedReceiverFlag = flagUrl;

  console.log("Selected reciver country  :",this.selectedReceiverTitle,this.selectedReceiverFlag);

const matchedDestination = this.destination;

// console.log("selectedReceiverCode :",this.selectedReceiverTitle); //

  if (matchedDestination) {
    console.log("Matched Destination:", matchedDestination);

 
    const destinationId = matchedDestination;
    console.log("destination id :", destinationId)
    const destinationTitle = matchedDestination;
    console.log("destination title :", destinationTitle);


    // Filter operators that belong to the matched destination
    this.selectedOperators = this.destination.filter(op => op.id === id || op.id === destinationId);
    console.log("Operator id matched : ",this.selectedOperators);
    

    if (this.selectedOperators.length === 0) {
      alert("No operators available for this destination.");
    }

  } else {
    alert("Selected country does not match any known destination.");
  }
}

getresult() {
  if (!this.selectedSenderCode || !this.selectedReceiverCode || this.selectedOperators.length === 0) {
    alert("Please complete both sender and receiver selections.");
    return;
  }

  this.router.navigate(['/folder/inbox'], {
    queryParams: {
      senderCode: this.selectedSenderCode,
      senderTitle: this.selectedSenderTitle,
      senderFlag: this.selectedSenderFlag,

      receiverCode: this.selectedReceiverCode,
      receiverTitle: this.selectedReceiverTitle,
      receiverFlag: this.selectedReceiverFlag,

      destination: JSON.stringify(this.selectedOperators)
    }
  });
}
}

