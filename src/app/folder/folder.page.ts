// import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ExchangeRatesService } from '../exchange-rate.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IonicModule,Platform } from '@ionic/angular';
import { CommonModule,Location } from '@angular/common';


declare let cordova: any; 
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
  providers: [Location]


})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  
  countryCode : string ='';
  countryNameTo : string = '';
  countryNameFrom : string = '';
  flagUrl : string = '';
  apiData : any;
  // country_from :string = '';
  // country_to :string = '';
  countryImg: string='';
  received :any = '';
  currency :any = '';
  countryTitle: string='';
  countryFlag: string='';
  WebImg:string = '';
  
  Imgage:any;
  operators:any;
  opt: any;
  // operators111 :any;
  SendercountryFlag:any=";"
 selectedCountryCode:any = "";
  senderCode:any ="";
  receiverCode :any = "";
  senderTitle: any="";
  receiverTitle:any = "";
  senderFlag:any ="";
  receiverFlag:any = "";
 
  img1:any='';

  private BASE_API = environment.BASE_API;
  private API_KEY = environment.API_KEY;
  

  isCheapestSelected: boolean = true;

  selectCheapest() {
    this.isCheapestSelected = true;
  }

  selectFastest() {
    this.isCheapestSelected = false;
  }
   
  constructor( private router: Router, private location: Location, private http: HttpClient, private platform: Platform) {
   
  }  



  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      
      // this.country_from = localStorage.getItem('selectedSenderCode') ||'';
      // this.countryNameFrom = JSON.stringify(localStorage.getItem('selectedCountryCode') ||'');
      // console.log("country_from",this.countryNameFrom)//
      // this.countryNameTo = localStorage.getItem('subCountryCode') || '';

      // this.countryCode = params['countryCode'];
      // this.countryNameTo = params['countryName'];
      // this.flagUrl = params['flagUrl'];

      // this.operators111 = params['operators'];
   
      this.apiData = params['apiData'] ? JSON.parse(params['apiData']) : null;
      this.operators = params['operators'] ? JSON.parse(params['operators']) : null;
      
      this.getCountryImage();
      this.getresult();
      
      this.countryNameFrom = params['senderTitle'];//
      this.SendercountryFlag = params['senderFlag'];
      this.countryTitle = params['senderTitle'];
      console.log("senderCode : ",this.countryTitle);
      console.log("senderTitle : ",this.countryTitle);
      console.log("SendercountryFlag : ",this.SendercountryFlag);

      this.countryNameTo = params['receiverTitle'];
      this.countryFlag = params['receiverFlag'];
      this.countryTitle = params['receiverTitle'];
      console.log("receiverCode : ",this.countryTitle);
      console.log("receiverTitle : ",this.countryTitle);
      console.log("receiverFlag : ",this.countryFlag);

    });
    
  }
 
getCountryImage() {

  
  const senderCode = localStorage.getItem('countryCode') || '';
  this.countryNameFrom = '';
  this.SendercountryFlag = '';

  if(senderCode == 'au'){
    this.SendercountryFlag = './assets/Country/au.svg';
    this.countryNameFrom = 'Australia';
  }
  else if(senderCode == 'nz'){
    this.SendercountryFlag = './assets/Country/nz.svg';
    this.countryNameFrom = 'New-Zealand';
  }
 else{
  console.warn('Unrecognized sender country code:', senderCode);
 }


// Receiver country (to)
this.countryCode = localStorage.getItem('selectedCountryCode') || '';
this.countryNameTo = localStorage.getItem('selectedCountryName') || '';
this.countryFlag = localStorage.getItem('selectedCountryFlag') || '';

// Debug logs
// console.log("Sender country:",this.countryNameFrom);
// console.log("Receiver country:", this.countryNameTo);

}

  
  // onClick(){
  //   this.router
  // }
  
  moreFilters(){
    this.router.navigate(['/more-filter'])
  }
  
//access data
amount: number[] = [200,500];
selectedAmount: number[] = [200];
results: any = [];
catId:any;
id:any ;
newResults : any;
idOptData:any;
optData :any;

//result API 
 getOperatorImage(id:string){
  // console.log("id :",id);
  // console.log(this.operators);

  // return this.operators.find(( op:any ) => op.id === id).image 
 }

//  getOperatorWeb(id:string){
//   return this.operators.find((op:any) => op.id === id ).website
//  }

getresult() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'apikey': 'gPbwtTUpYpW7bsEeQSHryQ=='
  };

  
  const params = {
    // country_from: localStorage.getItem('countryCode') || '', 
    countryNameFrom: localStorage.getItem('senderCode') || '', 
    countryNameTo : localStorage.getItem('receiverCode') || '', // destination country
    amount: this.selectedAmount,
    // amount: this.Selectedamount,
  };
  
  this.results = [];
  
  cordova.plugin.http.setDataSerializer('json');
  cordova.plugin.http.post(
    `${this.BASE_API}/getresult`,
    params,
    headers,
    (response: any) => {
      try {
        const data = JSON.parse(response.data);
        const initialData = JSON.parse(localStorage.getItem('initialData') || '[]')
        // console.log("initialData:",initialData);
        console.log(`API result for ${this.selectedAmount}:`,data); //data

       
      //  this.operators.forEach((item: any) => {
      //     const optData = this.operators[item.id] || {};
      //     console.log("newOptData :",optData);
      //   this.idOptData = optData.id;
      //     console.log("idOptData :",this.idOptData);
      //   })
//
        data.forEach((item: any) => {
          this.results.push({
            amount: this.selectedAmount,
            received: item.received,
            currency: item.currency,
            exchange_margin: item.exchange_margin,
            catId : item.catid,
            catTitle : item.title,
            operatorId: this.optData?.id || '',
            operatorTitle: this.optData?.title || '',
            operatorsImage: this.getOperatorImage(item.catid),
            // operatrosWebsite : this.getOperatorWeb(item.catid),
          }); 
       

          // console.log("Final Result:",this.results);
          // this.operators.forEach((item: any) => {
          //   const optData = this.operators[item.id] || {};
          //   console.log("newOptData :",optData);
          //   const idOptData = optData.id;
          //   console.log("idOptData :",idOptData);
          // })

        });
        
        
        // console.log("newResults",this.newResults); //


      } catch (error) {
        console.error('Error parsing result:', error);
      }
    },
    (error: any) => {
      console.error('HTTP request failed:', error);
    }
  );
}


isVector:boolean =false;
isGroup:boolean = false;

Vector(){
  this.isVector = false;
  this.isGroup = false; // turn off Group

}
GroupPng(){

  this.isGroup = true;
  this.isVector = true;
}

}

