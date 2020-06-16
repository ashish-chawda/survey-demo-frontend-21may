import { Component, OnInit } from '@angular/core';
import * as Survey from 'survey-angular';

Survey.StylesManager.applyTheme("bootstrap");
Survey.defaultBootstrapCss.navigationButton = "btn waves-light white-text right";




var surveyJSON = {"title":"Welcome To TeamMate Survey Demo","pages":[{"name":"page1","elements":[{"type":"text","name":"question1","title":"What is the name of your company ?","isRequired":true,"validators":[{"type":"text","minLength":0,"maxLength":0,"allowDigits":true}],"maxLength":100,"placeHolder":"Enter your answer here..."},{"type":"text","name":"question2","title":"How many agents are there in your company ?","isRequired":true,"validators":[{"type":"numeric"}],"inputType":"number","placeHolder":"Enter your answer here..."},{"type":"radiogroup","name":"question3","title":"Are you going to change your approach in next 24 months ?","isRequired":true,"choices":[{"value":"item1","text":"Yes"},{"value":"item2","text":"No"}]},{"type":"checkbox","name":"question4","title":"Choose your area of interest","isRequired":true,"choices":[{"value":"item1","text":"Hardware"},{"value":"item2","text":"Software"},{"value":"item3","text":"Education"},{"value":"item4","text":"Mining"}]}]},{"name":"page2","elements":[{"type":"text","name":"question5","title":"Test question ","isRequired":true}]}],"sendResultOnPageNext":true,"showPageNumbers":true,"questionDescriptionLocation":"underInput","questionErrorLocation":"bottom","showProgressBar":"bottom","progressBarType":"questions","checkErrorsMode":"onValueChanged","completeText":"Submit Survey","showPreviewBeforeComplete":"showAllQuestions"}


@Component({
  selector: 'app-surveyjs-demo',
  templateUrl: './surveyjs-demo.component.html',
  styleUrls: ['./surveyjs-demo.component.css']
})
export class SurveyjsDemoComponent implements OnInit {
  
  userData: any;  
  constructor() {     
   
    
     }
   
 sendDataToServer(survey) {
    //send Ajax request to your web server.
    this.userData = survey.data;
      console.log("The results are:" + JSON.stringify(survey.data));
      console.log(survey);

      let pageLen = surveyJSON.pages.length;
      let questionLen = surveyJSON.pages[pageLen - 1].elements.length;

      let quesCount = 0;
      for (let index = 0; index < pageLen; index++) {
        quesCount += surveyJSON.pages[index].elements.length;        
      }
      console.log('elements lenght =  ' + questionLen);
      surveyJSON.pages[pageLen - 1].elements.push(
        {
          choices: [{value: "item1", text: "Yes"}, {value: "item2", text: "No"}],
          type: "radiogroup",
          name: "question" + (quesCount + 1),
          isRequired: true,
          title: "Did you like this page ?"
        }
      );
      debugger;
      let newsurvey = new Survey.Model(surveyJSON);      
      newsurvey.data = this.userData;
      newsurvey.onComplete.add(function(result){        
        console.log("The results are:" + JSON.stringify(result.data));
      });
      Survey.SurveyNG.render("surveyElement", {model:newsurvey});
}

  ngOnInit(): void {
    var survey = new Survey.Model(surveyJSON);    
    survey.onComplete.add(this.sendDataToServer);
        
    Survey.SurveyNG.render("surveyElement", {model:survey }); 
   
  }



  afterQuestionAdd(newsurvey)
  {
    debugger;
    console.log("The results after new question add are:" + JSON.stringify(newsurvey.data));
    console.log(newsurvey);
  }
 
}
