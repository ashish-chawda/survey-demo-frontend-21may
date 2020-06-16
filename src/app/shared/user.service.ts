import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User, Survey, SurveyEntries } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: boolean = false;

  private readonly rootUrl = "https://localhost:44343/";
  constructor(private http: HttpClient) { }

  registerUser(user: User, roles: string[]) {
    console.log('inside register user');
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles: roles
    }

    console.log(body.Password);
    console.log(this.rootUrl + 'api/User/Register');
    return this.http.post(this.rootUrl + 'api/User/Register', body);
  }

  async submitSurvey(surveyEntry: SurveyEntries)
  {
    var token = 'Bearer ' +  localStorage.getItem('userToken');
    var header = new HttpHeaders({'Content-Type': 'application/json','Authorization': token});

    return await this.http.post(this.rootUrl + 'api/Survey/SubmitSurvey', surveyEntry, {headers: header}).toPromise();
  }
 async addQuestion(question: Survey){
    
    var token = 'Bearer ' +  localStorage.getItem('userToken');
    var header = new HttpHeaders({'Content-Type': 'application/json','Authorization': token});
    const body = {
      SurveyId: question.SurveyId,
      QuestionAnswerJson: question.QuestionAnswerJson
    }
    
    return await this.http.post(this.rootUrl + 'api/Survey/AddQuestion', question, {headers: header}).toPromise();
  }

  async editQuestion(question: Survey){
    
    var token = 'Bearer ' +  localStorage.getItem('userToken');
    var header = new HttpHeaders({'Content-Type': 'application/json','Authorization': token});  
    
    return await this.http.put(this.rootUrl + 'api/Survey/EditQuestion', question, {headers: header}).toPromise();
  }

  async deleteQuestion(question: Survey){
    
    var token = 'Bearer ' +  localStorage.getItem('userToken');
    var header = new HttpHeaders({'Content-Type': 'application/json','Authorization': token});  
    
    return await this.http.put(this.rootUrl + 'api/Survey/DeleteQuestion', question , {headers: header}).toPromise();
  }

  async getSurvey(){
    var token = 'Bearer ' +  localStorage.getItem('userToken');
    var header = new HttpHeaders({'Content-Type': 'application/json','Authorization': token});

    return await this.http.get(this.rootUrl + 'api/Survey/GetSurvey', {headers: header}).toPromise();

  }

  async authenticateUser(userName, password){
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var requestHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded'});

    return this.http.post(this.rootUrl + "/token", data, {headers: requestHeader}).toPromise();
  }

  getRoles(){

    return this.http.get(this.rootUrl + "api/GetAllRoles");
  }

  matchRoles(roles): boolean{
   var isMatch: boolean = false;
   var allowedRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
   console.log(allowedRoles);
     roles.forEach(element => {
       if(allowedRoles.indexOf(element) > -1){
         isMatch = true;        
       }
     });    
   
     console.log(isMatch);
   return isMatch;
  }
}
