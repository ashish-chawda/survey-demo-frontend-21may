import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  roles: any[];
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.resetForm();
    this.userService.getRoles()
    .subscribe((data: any) => {
      if(data){
        console.log('roles from service' + data);
        data.forEach(obj =>  obj.selected = false);
        this.roles = data;
      }
    });
  }

  onSubmit(userForm: NgForm) {
    var x = this.roles.filter(x => x.selected).map(x => x.Name);
    console.log('inside on submit function');
    this.userService.registerUser(userForm.value, x)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(userForm);
          this.toastr.success("User Registration Successfull !");          
        }
        else
        {
          this.toastr.error(data.Errors[0]);
        }
      });
  }

  changeSelected(i){
    this.roles[i].selected = !this.roles[i].selected;
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();     
    }

    this.user = {
      UserName: '',
      Password: '',
      FirstName: '',
      LastName: '',
      Email: ''
    };
    if(this.roles)
    this.roles.map(x => x.selected = false);
  }

}
