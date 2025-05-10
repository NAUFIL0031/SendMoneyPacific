import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone:true,
  imports:[IonicModule]
})
export class AboutPage implements OnInit {

  constructor(private router:Router,private location:Location) { }

  ngOnInit() {
  }
  navigateToAbout(){
    this.router.navigate(['/about'])
  }
}
