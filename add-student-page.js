import { application } from "../app.js";
import { Student } from "../classes/student.js";
import { Page } from "../framework/page.js";
import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";

export class AddStudent extends Page {
  constructor() {
    super("Add New Student");
  }

  createElement() {
    super.createElement();

    let name = new Text("name", "Name");
    name.appendToElement(this.element);

    let surname = new Text("surname", "Surname");
    surname.appendToElement(this.element);

    let studentId = new Text("id", "ID");
    studentId.appendToElement(this.element);

    let email = new Text("mail", "Email");
    email.appendToElement(this.element);

    let dateCreated = new Text("date", "Date");
    dateCreated.appendToElement(this.element);

    let btn = new Button("Save");
    btn.appendToElement(this.element);
    btn.element.click(() =>
      this.saveStudent(
        name.getValue(),
        surname.getValue(),
        studentId.getValue(),
        email.getValue(),
        dateCreated.getValue()

      )

    );

  }

  getElementString() {
    return '<div style="margin:20px;"><h3>New Student</h3></div>';
  }

  saveStudent(name, surname, studentId, email, dateCreated) {
    let student = new Student(name, surname, studentId, email, dateCreated);
    console.log(student);
    application
      .postData("https://ip-uacs.herokuapp.com/api/student", student)
      .then((result) => {
        console.log(result);
      });
  }
}
