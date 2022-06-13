import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AddImageComponent } from './add-image/add-image.component';
import { AuthGuard } from './auth/auth.guard';
import { DownloadComponent } from './download/download.component';
import { HomeComponent } from './home/home.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'add', component: AddImageComponent },
      { path: 'images', component: ShowImageComponent },
      { path: 'downloads', component: DownloadComponent },
      { path: 'account', component: AccountComponent }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
