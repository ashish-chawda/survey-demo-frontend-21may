export class User {
    UserName: string;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;

}

export class Survey{
   SurveyId: string;
   QuestionAnswerJson: string;
}

export class CheckBoxes {
    Name: string;
    Value: string;
}
export class RadioButtons {
    Name: string;
    Value: string;
}

const form_template = [
    {
      "type":"textBox",
      "label":"Name",
      "validators": ['required']
    },
    {
      "type":"number",
      "label":"Age"
    },
    {
      "type":"select",
      "label":"favorite book",
      "options":["Jane Eyre","Pride and Prejudice","Wuthering Heights"]      
    }
  ]
  export default form_template

  export class EditQuestion {
    QuestionType: string;
    Options?: string[];
  };

  export class SurveyEntries{
    SurveyId?: number;
    UserName: string;
    SurveyJson: string;
    IsCompleted: boolean;
  }