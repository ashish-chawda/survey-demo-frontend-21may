import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

   
  logout() {
    this.userService.isUserLoggedIn = false;
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    this.toastr.info('You have been logged out !', 'Log Out');
    this.router.navigate(['/login']);
  }


}
