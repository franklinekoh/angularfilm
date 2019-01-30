import { Component, OnInit } from '@angular/core';

import { Login } from '../login';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
  
    ) { }

  ngOnInit() {
  }

  login: Login = new Login();


  resetForm(form: NgForm){

    if(form != null){
      form.reset();

      this.login = {
        email: '',
        password: ''
      }
    }
  }

  onSubmit(form: NgForm){
    console.log(form.value);

    this.authenticationService.login(form.value).subscribe((data) => {

      console.log(data);
      if(data.status == 'success'){
          this.toastr.success('Login successful');

          // redirect to dashboard
          const url = 'films';

          this.router.navigate([url]);
          // window.location.reload();
          // return this.redirectTo(url);
      }
    }, err => {
      console.log(err);

      if(err.status == 401){
        this.toastr.error('Incorrect login credentials, please try again');
      }
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));}
}
