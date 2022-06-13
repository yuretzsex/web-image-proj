import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'http://localhost:5000';

  user: UserModel

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }

  formModel = this.fb.group({
    Email: ['', [Validators.email, Validators.required]],
    Name: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(5)]],
      PasswordConfirm: ['', [Validators.required, Validators.minLength(5)]],
    })
  })

  register() {
    var body = {
      Name: this.formModel.value.Name,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };

    return this.http.post(this.BaseURI + '/auth/register', body);
  }

  
  updateUserInfo(val: any) {
    return this.http.put(this.BaseURI + '/user', val);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/auth/login', formData, { responseType: 'text' }).subscribe(
      response => {
        console.log(JSON.parse(response).data)
        localStorage.setItem('token', JSON.parse(response).data);
        this.user = this.getUser(response);
        this.router.navigateByUrl('/home');
      },
      (error: HttpErrorResponse) => {
        this.toastr.error('Invalid password or email', 'Error');
      });
  }

  public getUser(token: string): UserModel {
    let uid = JSON.parse(atob(token.split('.')[1])).user_id;
    let uname = JSON.parse(atob(token.split('.')[1])).nickname;
    let uemail = JSON.parse(atob(token.split('.')[1])).email;
    var u = new UserModel(uid, uemail, uname);
    console.log(u);
    return u;
  }
}
