import $ from "jquery";
import { ApplicationBase } from "./framework/application-base.js";
import { AddCarPage } from "./pages/add-car-page.js";
import {AddStudent} from "./pages/add-student-page.js";
import { CarsPage } from "./pages/cars-page.js";
import {StudentsPage} from "./pages/students-page.js";
import { HomePage } from "./pages/home-page.js";
import { FleetDataService } from "./services/fleet-data-service.js";

export class App extends ApplicationBase {
  constructor() {
    super("Final");
    this.dataService = new FleetDataService();
    let url = "https://ip-uacs.herokuapp.com/api/student"
    this.getData(url).then((fleet) => {
      this.dataService.loadData(fleet);

      console.log(this.dataService.filterStudentsById("student"));
      console.log(this.dataService.getCarByLicense("AT9900"));
      console.log(this.dataService.getCarsSortedByLicense());
    });

    this.addRoute("Home", new HomePage(), true);
    this.addRoute("Cars", new CarsPage());
    this.addRoute("AddCar", new AddCarPage(), false, false);
    this.addRoute("Students", new StudentsPage());
    this.addRoute("AddStudent", new AddStudent(), false, false);
  }
}

export let application = new App();
application.show($("body"));
