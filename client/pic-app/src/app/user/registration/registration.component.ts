import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService, private router: Router,) {
    this.service.formModel.reset();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.register().subscribe({
      complete: () => {
        this.service.formModel.reset();
        this.toastr.success('New user created!', 'Registration successful.');
        this.router.navigateByUrl('/user/login');
      },
      error: () => {
        this.toastr.error('Something went wrong!', 'Registration failed.');
      }
    });
  }

}
