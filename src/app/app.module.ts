import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { UserComponent } from './user/user.component';

import {RouterModule} from '@angular/router';
import { appRoutes } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './shared/user.service';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { AspectReportsComponent } from './aspect-reports/aspect-reports.component';
import { MaturityModelComponent } from './maturity-model/maturity-model.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SurveyjsDemoComponent } from './surveyjs-demo/surveyjs-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    EditSurveyComponent,
    AspectReportsComponent,
    MaturityModelComponent,
    NavbarComponent,
    SurveyjsDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule    
  ],
  providers: [AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
