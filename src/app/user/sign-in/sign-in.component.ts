import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private toastr: ToastrService,private userService: UserService, private router: Router) { }
  isLoginError: boolean = false;
  ngOnInit(): void {
  }

  

  async loginUser(username, password){

    this.toastr.toastrConfig.progressBar = true;
    this.toastr.toastrConfig.progressAnimation = "increasing";
    this.toastr.info('Please wait while we confirm your details.', 'Authenticating');

    console.log('inside login');
    var response: any  = await this.userService.authenticateUser(username, password);
    if(response != null)
    {
      localStorage.setItem('userToken', response.access_token);
      localStorage.setItem('userName', username);
      localStorage.setItem('userRoles', response.role);
      this.router.navigate(['/home']);
      this.toastr.clear();
      this.toastr.toastrConfig.progressBar = false;
      this.toastr.success('Welcome ' + username, 'Welcome');
      this.userService.isUserLoggedIn = true;
    }   
   
  }

}
