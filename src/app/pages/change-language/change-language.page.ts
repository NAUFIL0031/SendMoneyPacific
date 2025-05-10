import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
  standalone:true,
  imports:[IonicModule]
})
export class ChangeLanguagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
