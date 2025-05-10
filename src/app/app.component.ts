import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
 
 
  constructor(private router: Router) {}

  // This is the method that is called when you click the ion-item
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToAbout(){
    this.router.navigate(['/about'])
  }
  navigateToContact(){
    this.router.navigate(['/contact-us'])
  }
  navigateTologin(){
    this.router.navigate(['/login'])
  }
  navigateToSettings(){
    this.router.navigate(['/settings'])
  }

  navigateToChangeLang(){
    this.router.navigate(['/change-language'])
  }
}
