import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-more-filter',
  templateUrl: './more-filter.page.html',
  styleUrls: ['./more-filter.page.scss'],
  standalone:true,
  imports:[IonicModule]
})
export class MoreFilterPage implements OnInit {

  constructor( private location:Location) { }

  ngOnInit() {
  }
onClose(){
  this.location.back();
}
}
