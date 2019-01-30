import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService) {

    
   }

  ngOnInit() {

    this.checkLoggedIn();
    // console.log(this.isLoggedIn);

  }

  public isLoggedIn: any;

  checkLoggedIn(){
  
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }
}
