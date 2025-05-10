import { CommonModule } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { ExchangeRatesService } from 'src/app/exchange-rate.service';
import { environment } from 'src/environments/environment'

declare const cordova:any

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports:[IonicModule,ReactiveFormsModule,CommonModule,FormsModule]
  
})
export class LoginPage implements OnInit {
  exchangeRates: any;
  username:any;
  password:any;

//declare username and password string
  private BASE_API = environment.BASE_API
  private API_KEY = environment.API_KEY;
  
// 
  loginForm: FormGroup;
  // errorMessage: string = '';
  constructor(private router:Router,private fb: FormBuilder,private loadingController:LoadingController, private toastController:ToastController ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required]
    });
   }
   
   async login() {
    if (this.loginForm.invalid) {
      await this.showToast('Please enter a valid username and password.', 'warning');
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Logging in...',
    });
    await loading.present();
  
    const formData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
  
    cordova['plugin'].http.post(
      `${this.BASE_API}/login`,
      formData,
      { apikey: this.API_KEY },
      async (response:any) => {
        console.log('Login Response:', response);
  
        // Check if the response contains an error message
        if (response.data && response.data.error) {
          await loading.dismiss();
          await this.showToast(response.data.error, 'danger'); // Show error message from server
          return;
        }
  
        const tokenData = JSON.stringify(response.data);
        console.log(tokenData);
  
        await loading.dismiss();
        this.router.navigate(['/home']);
        await this.showToast('Login Successfully!', 'success');
      },
      async (error: any) => {
        console.error('Login Error:', error);
        await loading.dismiss();
  
        // Handle server error responses correctly
        if (error) {
          await this.showToast('Incorrect username or password.', 'danger');
          console.log('999');
        } else {
          await this.showToast('Login failed. Please try again.', 'warning');
        }
      }
    );
  }
  
  
  async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000, 
      position: 'bottom', 
      color,
    });
    await toast.present();
  }

  ngOnInit() {
    
  }
  // getExchangeDate(){
  //   this.exchangeRatesService.getExchangeRates().subscribe(data => {
  //     this.exchangeRates = data;  
  //     console.log('Exchange Rates:', this.exchangeRates);
  //   });
  // }
} 

