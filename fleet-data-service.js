import { Car } from "../classes/car.js";
import { Student } from "../classes/student.js";
import { DataError } from "./data-error.js";

export class FleetDataService {
  constructor() {
    this.cars = [];
    this.students = [];
    this.errors = [];
  }

  loadData(student) {
    for (let data of student) {
      switch (data.type) {
        case "Car":
          if (this.validateCarData(data)) {
            let car = this.loadCar(data);
            if (car) this.cars.push(car);
          } else {
            let e = new DataError("Invalid data type", data);
            this.errors.push(e);
          }
          break;
        case "student":
          if (this.validateStudentData(data)) {
            let student1 = this.loadStudent(data);
            this.students.push(student1);
          } else {
            let e = new DataError("Invalid data type", data);
            this.errors.push(e);
          }
          break;
        default:
          let e = new DataError("Invalid data type", data);
          this.errors.push(e);
          break;
      }
    }
  }

  loadCar(data) {
    try {
      let car = new Car(data.license, data.model, data.latLong);
      car.miles = data.miles;
      car.make = data.make;
      return car;
    } catch (e) {
      this.errors.push(new DataError("error loading car", data));
    }
    return null;
  }

  validateCarData(data) {
    let requiredProps = "license model latLong miles make".split(" ");
    let hasErrors = false;
    for (let field of requiredProps) {
      if (!data[field]) {
        this.errors.push(new DataError(`Invalid field ${field}`, data));
        hasErrors = true;
      }
    }
    if (Number.isNaN(Number.parseFloat(data.miles))) {
      this.errors.push(new DataError(`Invalid mileage`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.license)) {
      this.errors.push(new DataError(`Invalid licence`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.model)) {
      this.errors.push(new DataError(`Invalid licence`, data));
      hasErrors = true;
    }
    return !hasErrors;
  }

  loadStudent(data) {
    try {
      let student = new Student(data.firstName, data.lastName, data.studentId, data.email, data.dateCreated);
      student.firsName = data.firstName;
      student.lastName = data.lastName;
      student.studentId = data.studentId;
      student.email = data.email;
      student.dateCreated = data.dateCreated;
      return student;
    } catch (e) {
      this.errors.push(new DataError("error loading student", data));
    }
    return null;
  }

  validateStudentData(data) {
    let requiredProps = "firstName lastName studentId email dateCreated".split(" ");
    let hasErrors = false;
    for (let field of requiredProps) {
      if (!data[field]) {
        this.errors.push(new DataError(`Invalid field ${field}`, data));
        hasErrors = true;
      }
    }

    if (this.stringNullOrEmpty(data.firstName)) {
      this.errors.push(new DataError(`Invalid Name`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.lastName)) {
      this.errors.push(new DataError(`Invalid Surname`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.studentId)) {
      this.errors.push(new DataError(`Invalid id`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.email)) {
      this.errors.push(new DataError(`Invalid email`, data));
      hasErrors = true;
    }
    if (this.stringNullOrEmpty(data.dateCreated)) {
      this.errors.push(new DataError(`Invalid Date`, data));
      hasErrors = true;
    }

    return !hasErrors;
  }

  stringNullOrEmpty(str) {
    return (
      typeof str == "undefined" ||
      !str ||
      str.length === 0 ||
      str === "" ||
      !/[^\s]/.test(str) ||
      /^\s*$/.test(str) ||
      str.replace(/\s/g, "") === ""
    );
  }

  getCarByLicense(license) {
    return this.cars.find((car) => car.licence === license);
  }

  getCarsSortedByLicense() {
    return this.cars.sort((a, b) => {
      if (a.licence < b.licence) return -1;
      if (a.licence > b.licence) return 1;
      else 0;
    });
  }

  filterCarsByMake(filter) {
    return this.cars.filter((car) => car.make.indexOf(filter) >= 0);
  }
  filterStudentsById(filter) {
    return this.students.filter((student) => student.studentId.indexOf(filter) >= 0);
  }
}
