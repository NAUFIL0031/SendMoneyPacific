import { Component, OnInit } from '@angular/core';
import { ExchangeRatesService } from '../exchange-rate.service';


@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  exchangeRates: any;  

  constructor(private exchangeRatesService: ExchangeRatesService) {}

  ngOnInit(): void {
  
    this.exchangeRatesService.getExchangeRates().subscribe(data => {
      this.exchangeRates = data;  
      console.log('Exchange Rates:', this.exchangeRates);
    });
  }
}
