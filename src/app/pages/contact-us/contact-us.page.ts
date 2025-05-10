import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExchangeRatesService } from 'src/app/exchange-rate.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  standalone:true,
  imports:[IonicModule]
})
export class ContactUsPage implements OnInit {
  exchangeRates: any;
  fisrtName:any =''
  lastName :string = ''
  Email :string = ''
  PhoneNumber :string = ''
  Message : string = ''

  constructor(private exchangeRatesService: ExchangeRatesService,private router:Router,private fb: FormBuilder ) { }


  // contact_us() {
  //   // this.router.navigate(['/folder/inbox']);
  //   let formData = JSON.stringify({fisrtName:this.fisrtName,lastName:this.lastName,Email:this.Email,PhoneNumber:this.PhoneNumber,Message:this.Message})

  //   this.exchangeRatesService.login(formData).subscribe(
  //     (response) => {
  //       console.log('submit successful', response);
  //       localStorage.setItem('token', response.token);
  //       // this.router.navigate(['/folder/inbox']);
  //     },
  //     // (error) => {
  //     //   console.error('Login failed', error);
  //     //   // this.Message = 'Invalid fisrtName or lastName';
  //     // }
  //   );
  // }
  ngOnInit() {
  }

}
