import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AspectReportsComponent } from './aspect-reports/aspect-reports.component';
import { MaturityModelComponent } from './maturity-model/maturity-model.component';
import { SurveyjsDemoComponent } from './surveyjs-demo/surveyjs-demo.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'aspect-reports', component: AspectReportsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'maturity-model', component: MaturityModelComponent, canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    {
        path: 'surveyjs', component: SurveyjsDemoComponent
    }

];