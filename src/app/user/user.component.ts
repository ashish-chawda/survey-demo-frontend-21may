import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router, private userService: UserService) { }

  isUserLoggedIn: boolean = this.userService.isUserLoggedIn;

  ngOnInit(): void {  
    
  }

 
}
