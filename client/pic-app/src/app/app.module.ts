import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { ImageService } from './shared/image.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagePostComponent } from './image-post/image-post.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { DownloadComponent } from './download/download.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatIconModule} from '@angular/material/icon';
import { AccountComponent } from './account/account.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddImageComponent,
    ShowImageComponent,
    ImagePostComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    DownloadComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  providers: [ImageService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
