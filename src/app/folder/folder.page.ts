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

  private BASE_API = environment.BASE_API;
  private API_KEY = environment.API_KEY;
  
  countryCode : string ='';
  countryNameTo : string = '';
  countryNameFrom : string = '';
  flagUrl : string = '';
  apiData : any;
  country_from :string = '';
  country_to :string = '';
  countryImg: string='';
  received :any = '';
  currency :any = '';
  countryTitle: string='';
  countryFlag: string='';
  WebImg:string = '';
  
  Imgage:any;
  operators:any;
  opt: any;
  operators111 :any;
 
  
  isCheapestSelected: boolean = true;

  selectCheapest() {
    this.isCheapestSelected = true;
  }

  selectFastest() {
    this.isCheapestSelected = false;
  }
   
  constructor( private router: Router, private location: Location, private http: HttpClient, private platform: Platform) {
    // const cData = localStorage.getItem('countryCode')
    // this.countryImg = cData;
    // console.log('111',    this.countryImg 
    // );
  }  

  // destinationMap: { [key: string]: any } = {};

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      
      this.country_from = localStorage.getItem('selectedSenderCode') ||'';
      this.country_to = localStorage.getItem('subCountryCode') || '';

      this.countryCode = params['countryCode'];
      this.countryNameTo = params['countryName'];
      this.flagUrl = params['flagUrl'];

      // this.operators111 = params['operators'];
   
      this.apiData = params['apiData'] ? JSON.parse(params['apiData']) : null;
      this.operators = params['operators'] ? JSON.parse(params['operators']) : null;
      
      this.getCountryImage();
      this.getresult();
      
      
    });
    
  }

getCountryImage() {
  
  // Sender country (from)
  // const cData = localStorage.getItem('countryCode');
  const cData = localStorage.getItem('selectedSenderCode');
  
  this.countryNameFrom ='';
  this.countryImg = '';
  console.log('Sender country :',cData);
  console.log('countryFrom country :',this.countryNameFrom);

  if (cData === 'au') {
    this.countryImg = './assets/Country/au.svg';
    this.countryNameFrom = 'Australia';
  } 
  else if (cData === 'nz') {
    this.countryImg = './assets/Country/nz.svg';
    this.countryNameFrom = 'New Zealand';
  } 

  // Receiver country (to)
  this.countryCode = localStorage.getItem('selectedCountryCode') || '';
  this.countryNameTo = localStorage.getItem('selectedCountryName') || '';
  this.countryFlag = localStorage.getItem('selectedCountryFlag') || '';

  console.log('Receiver Country:', this.countryNameTo);
}

  
  // onClick(){
  //   this.router
  // }
  
  moreFilters(){
    this.router.navigate(['/more-filter'])
  }
  
//access data
amount: number[] = [200, 500];
selectedAmount: number[]=[];
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

  return this.operators.find((op:any ) => op.id === id).image
 }


getresult() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'apikey': 'gPbwtTUpYpW7bsEeQSHryQ=='
  };

  cordova.plugin.http.setDataSerializer('json');

  if (!this.amount) {
    console.warn("No amount selected.");
    return;
  }

  const params = {
    // country_from: localStorage.getItem('countryCode') || '', 
    country_from: localStorage.getItem('selectedCountryCode') || '', 
    country_to: localStorage.getItem('subcontryCode') || '', // destination country
    amount: this.selectedAmount,
    // amount: Amount,
  };

  this.results = [];
  
  cordova.plugin.http.post(
    `${this.BASE_API}/getresult`,
    params,
    headers,
    (response: any) => {
      try {
        const data = JSON.parse(response.data);
        const initialData = JSON.parse(localStorage.getItem('initialData') || '[]')
        console.log(`API result for ${this.selectedAmount}:`, data);

       
      //  this.operators.forEach((item: any) => {
      //     const optData = this.operators[item.id] || {};
      //     console.log("newOptData :",optData);
      //   this.idOptData = optData.id;
      //     console.log("idOptData :",this.idOptData);
      //   })

        data.forEach((item: any) => {
          this.results.push({
            amount: this.selectedAmount,
            received: item.received,
            currency: item.currency,
            catId : item.catid,
            catTitle : item.title,
            operatorId: this.optData?.id || '',
            operatorTitle: this.optData?.title || '',
            operatorsImage: this.getOperatorImage(item.catid),
      
          });
       

          console.log("Final Result:",this.results);
          // this.operators.forEach((item: any) => {
          //   const optData = this.operators[item.id] || {};
          //   console.log("newOptData :",optData);
          //   const idOptData = optData.id;
          //   console.log("idOptData :",idOptData);
          // })

        });
        
        
        // console.log("newResults",this.newResults);
    

      } catch (error) {
        console.error('Error parsing result:', error);
      }
    },
    (error: any) => {
      console.error('HTTP request failed:', error);
    }
  );
}
}

