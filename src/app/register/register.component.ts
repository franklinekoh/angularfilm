import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Register } from '../register';
import { RegisterService } from '../register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  register: Register = new Register();

  resetForm(form: NgForm){

    if(form != null){
      form.reset();

      this.register = {
        name: '',
        email: '',
        password: ''
      }
    }
  }


  onSubmit(form: NgForm){

    this.registerService.registerUser(form.value).subscribe((data: any) => {
      // console.log(data);
      if(data.status == 'success'){
        // console.log(data);
        this.resetForm(form)
        this.toastr.success('Registeration complete, login to proceed');
      }else{
        this.toastr.error('registeration failed: '+data.message)
      }
    });
    
  }

}
