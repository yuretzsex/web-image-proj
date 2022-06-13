import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private service: UserService, private toastr: ToastrService, private router: Router) { }

  name: string;
  email: string;
  password: string;

  ngOnInit(): void {
    var tkn = localStorage.getItem('token');
    var res: string;
    if (tkn == null) {
      res = "";
    } else {
      res = tkn;
    }

    var usr = this.service.getUser(res)

    this.name = usr.name;
    this.email = usr.email;
  }

  onClick() {
    console.log(this.name, this.email, this.password);

    var tkn = localStorage.getItem('token');
    var res: string;
    if (tkn == null) {
      res = "";
    } else {
      res = tkn;
    }

    var element = {
      id: this.service.getUser(res).id,
      nickname: this.name,
      email: this.email,
      password: this.password
    }

    this.service.updateUserInfo(element).subscribe(res => {
      console.log(res);
      this.toastr.success("Updated successfully", "Success");

      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
    },
      error => {
        this.toastr.error("Cant update info", "Error");
        this.router.navigateByUrl("/home");
      }
    );

  }

}
