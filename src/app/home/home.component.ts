import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Survey, CheckBoxes, RadioButtons, EditQuestion, SurveyEntries } from '../shared/user.model';
import { NgForm, FormArray, FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from '../../../node_modules/sweetalert';
import { JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  editMode: boolean = false;
  initialCheckBoxes: number = 2;
  intialRadioOptions: number = 2;

  editInitCheckBoxes = 2;
  editInitRadioOptions = 2;

  editCheckBoxes: CheckBoxes[];
  editRadioButtons: RadioButtons[];

  checkBoxes: CheckBoxes[];
  radioButtons: RadioButtons[];
  isSurveyReady: boolean = false;

  questionData: any = [];
  surveyFormGroup: FormGroup;


  isAdmin: boolean = false;
  isAddQuestion: boolean = false;
  isExploreSurvey: boolean = false;
  dictMap = new Map<string, boolean>();
  editQuestionType = new Map<string, string>();

  constructor(private toastr: ToastrService ,private router: Router, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.isAdmin = this.userService.matchRoles(['Admin']);
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
    this.checkBoxes = [];
    this.radioButtons = [];
    this.editRadioButtons = [];
    this.editCheckBoxes = [];
    for (let index = 0; index < this.initialCheckBoxes; index++) {
      this.checkBoxes[index] = {
        Name: 'Checkbox' + index,
        Value: ''
      };
    }
    for (let index = 0; index < this.intialRadioOptions; index++) {
      this.radioButtons[index] = {
        Name: 'Radio' + index,
        Value: ''
      };
    }
    for (let index = 0; index < this.editInitCheckBoxes; index++) {
      this.editCheckBoxes[index] = {
        Name: 'Checkbox' + index,
        Value: ''
      };
    }
    for (let index = 0; index < this.editInitRadioOptions; index++) {
      this.editRadioButtons[index] = {
        Name: 'Radio' + index,
        Value: ''
      };
    }
  }

  enableEditMode(questionId) {
    
    this.dictMap.set(questionId, true);
    this.toastr.info('Edit Mode Enabled', 'Edit');
  }

  cancelEdit(questionId) {
    this.dictMap.set(questionId, false);
    this.toastr.info('Edit Mode Disabled', 'Edit');
  }

  setQuestionType(type, quesId) {
    debugger;
    this.editQuestionType.set(quesId, type);
  }

  deleteQuestion(quesId, index){
    
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this question!",
      icon: "warning",
      buttons: ['Cancel', 'Ok'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Question has been deleted!", {
          icon: "success",
        });

        this.callDeleteFunction(quesId, index);
      } else {
        swal("Your question is safe!");
      }
    });
  

  }

  async callDeleteFunction(quesId, index){
    var questionEntity: Survey = {
      SurveyId: quesId, QuestionAnswerJson: JSON.stringify(this.questionData[index].QuestionAnswerJson)
    };
    var result = await this.userService.deleteQuestion(questionEntity);
    var delResult: any = await this.userService.getSurvey();
    this.toastr.success('Delete was successfull', 'Delete Question');
    this.createSurveyForm(delResult);
  }

 async  saveAndClosEditMode(index, quesId) {

    if (this.editQuestionType.get(quesId) === 'checkbox') {
      var options = [];
      for (let index = 0; index < this.editInitCheckBoxes; index++) {

        options[index] = this.editCheckBoxes[index].Value;
      }
      this.questionData[index].QuestionAnswerJson.type = 'checkbox';
      this.questionData[index].QuestionAnswerJson.options = options;

    }
    else if (this.editQuestionType.get(quesId) === 'radio') {
      var options = [];
      for (let index = 0; index < this.editInitRadioOptions; index++) {

        options[index] = this.editRadioButtons[index].Value;
      }
      this.questionData[index].QuestionAnswerJson.type = 'radio';
      this.questionData[index].QuestionAnswerJson.options = options;
    }
    else if (this.editQuestionType.get(quesId) === 'textbox') {
      this.questionData[index].QuestionAnswerJson.type = 'textbox';
    }
    else if (this.editQuestionType.get(quesId) === 'number') {
      this.questionData[index].QuestionAnswerJson.type = 'number';
    }

    this.editMode = false;
    console.log(this.questionData[index]);
    this.dictMap.set(quesId, false);

    
    var questionEntity: Survey = {
      SurveyId: quesId, QuestionAnswerJson: JSON.stringify(this.questionData[index].QuestionAnswerJson)
    };
    var response = await this.userService.editQuestion(questionEntity);
    this.toastr.success('Modifications are saved successfully !', 'Modify Question');
    console.log("Entry from DB: " + response);
  }

  createSurveyForm(result){

    console.log(JSON.stringify(result));
    this.questionData = [];
    for (let index = 0; index < result.length; index++) {

      this.questionData.push(JSON.parse(JSON.stringify(result[index])));
      this.dictMap.set(JSON.stringify(result[index].SurveyId), false);
      this.editQuestionType.set(result[index].SurveyId, '');
    }

    let group = {};

    for (let index = 0; index < this.questionData.length; index++) {

      this.questionData[index].QuestionAnswerJson = JSON.parse(this.questionData[index].QuestionAnswerJson);


      group[this.questionData[index].SurveyId] = new FormControl('', [Validators.required]);
      group[this.questionData[index].QuestionAnswerJson.question] = new FormControl('');
      if (this.questionData[index].QuestionAnswerJson.type === 'checkbox' || this.questionData[index].QuestionAnswerJson.type === 'radio') {
        group['options'] = new FormArray([]);
      }

    }

    this.surveyFormGroup = new FormGroup(group);
  }

  async loadSurvey() {
    this.toggleSurvey();

    var result: any = await this.userService.getSurvey();
    this.createSurveyForm(result);
    this.isSurveyReady = true;
  }


  addRadioButtonOption() {
    this.intialRadioOptions = this.intialRadioOptions + 1;
    this.radioButtons[this.intialRadioOptions - 1] = {
      Name: 'Radio' + (this.intialRadioOptions - 1),
      Value: ''
    };
  }
  addCheckBoxOption() {
    this.initialCheckBoxes = this.initialCheckBoxes + 1;
    this.checkBoxes[this.initialCheckBoxes - 1] = {
      Name: 'Checkbox' + (this.initialCheckBoxes - 1),
      Value: ''
    };
  }

  addInitRadioButtonOption() {
    this.editInitRadioOptions = this.editInitRadioOptions + 1;
    this.editRadioButtons[this.editInitRadioOptions - 1] = {
      Name: 'Radio' + (this.editInitRadioOptions - 1),
      Value: ''
    };
  }
  addInitCheckBoxOption() {
    this.editInitCheckBoxes = this.editInitCheckBoxes + 1;
    this.editCheckBoxes[this.editInitCheckBoxes - 1] = {
      Name: 'Checkbox' + (this.editInitCheckBoxes - 1),
      Value: ''
    };
  }

  removeRadioButtonOption() {
    if (this.intialRadioOptions >= 0) {
      this.radioButtons.splice(this.intialRadioOptions, 1);
    }

    if (this.intialRadioOptions > 0) {
      this.intialRadioOptions = this.intialRadioOptions - 1;
    }

  }

  removeInitRadioButtonOption() {
    if (this.editInitRadioOptions >= 0) {
      this.editRadioButtons.splice(this.editInitRadioOptions, 1);
    }

    if (this.editInitRadioOptions > 0) {
      this.editInitRadioOptions = this.editInitRadioOptions - 1;
    }

  }

  removeCheckBoxOption() {
    if (this.initialCheckBoxes >= 0)
      this.checkBoxes.splice(this.initialCheckBoxes, 1);

    if (this.initialCheckBoxes > 0)
      this.initialCheckBoxes = this.initialCheckBoxes - 1;
  }
  removeInitCheckBoxOption() {
    if (this.editInitCheckBoxes >= 0)
      this.editCheckBoxes.splice(this.editInitCheckBoxes, 1);

    if (this.editInitCheckBoxes > 0)
      this.editInitCheckBoxes = this.editInitCheckBoxes - 1;
  }



  // onCheckboxChange(e) {
  //   const checkArray: FormArray = this.newFormGroup.get('options') as FormArray;

  //   if (e.target.checked) {
  //     checkArray.push(new FormControl(e.target.value));
  //   } else {
  //     let i: number = 0;
  //     checkArray.controls.forEach((item: FormControl) => {
  //       if (item.value == e.target.value) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }

  AddValues(value, $event) {

    console.log(value);
    var index = this.questionData.indexOf(value);
    console.log(index);
  }


  async onSubmit(form: NgForm) {

    var surveyEntry: SurveyEntries = {
      IsCompleted: true, SurveyJson: JSON.stringify(form),
      UserName: localStorage.getItem('userName')
    };

    var response = await this.userService.submitSurvey(surveyEntry);
    if(response != null){      
      this.toastr.success('Your survey entry has been saved successfully!', 'Success');
      this.isExploreSurvey = false;
      this.isAddQuestion = false;
    }
    console.log(JSON.stringify(response));
    
  }

  async SaveQuestion(formData: NgForm) {
    var jsonData;
    console.log(formData.value);
    if (formData.value.answer === 'checkbox') {
      var options = [];
      for (let index = 0; index < this.initialCheckBoxes; index++) {

        options[index] = this.checkBoxes[index].Value;
      }
      jsonData = {
        "type": "checkbox",
        "question": formData.value.question,
        "options": options,
        "name": "question" + this.questionData.length + 1
      };
    }
    else if (formData.value.answer === 'radio') {
      var options = [];
      for (let index = 0; index < this.intialRadioOptions; index++) {

        options[index] = this.radioButtons[index].Value;
      }
      jsonData = {
        "type": "radio",
        "question": formData.value.question,
        "options": options,
        "name": "question" + this.questionData.length + 1
      };
    }
    else if (formData.value.answer === 'textbox') {
      jsonData = {
        "type": "textbox",
        "question": formData.value.question,
        "name": "question" + this.questionData.length + 1
      };
    }
    else if (formData.value.answer === 'number') {
      jsonData = {
        "type": "number",
        "question": formData.value.question,
        "name": "question" + this.questionData.length + 1
      };
    }

    this.questionData.push(jsonData);
    var question: Survey = {
      SurveyId: '',
      QuestionAnswerJson: JSON.stringify(jsonData)
    };

    console.log(question);

    var response = await this.callAddQuestion(question);
    this.toastr.success('New Question added successfully !', 'Add Question');
    formData.reset();
    this.toggleAddQuestion();
    console.log("Question Data" + JSON.stringify(this.questionData));
  }

  async callAddQuestion(question) {
    var response = await this.userService.addQuestion(question);
    console.log('Question Added: ');
    console.log(response);


  }
  toggleAddQuestion() {
    this.isAddQuestion = !this.isAddQuestion;
  }

  toggleSurvey() {
    this.isExploreSurvey = !this.isExploreSurvey;
  }

  logout() {
    localStorage.removeItem('userToken');
    this.toastr.info('You have been logged out !', 'Log Out');
    this.router.navigate(['/login']);
  }

  SaveForm(form) {
    console.log(form.map(x => JSON.stringify(form)));
  }

}
