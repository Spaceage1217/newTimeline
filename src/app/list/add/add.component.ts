import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {task} from '../../shared/task.model';
import{TaskService} from "../../services/task.service";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validator,
  FormBuilder
}from '@angular/forms'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})


export class AddComponent implements OnInit {

  addTaskForm:FormGroup;
  task:task;


  constructor(private _taskService:TaskService) {}

  addTime()
  {
    let current: Date = new Date();
    let started: boolean;
    let finished: boolean;
    (this.addTaskForm.value.time.start.getTime() < current.getTime())?started=true:started=false;
    (this.addTaskForm.value.time.end.getTime() < current.getTime())?finished=true:finished=false;
    console.log("FROM THE ADD COMPONENT IT EVALUATES THE ALARM STARTED AS... "+ started);
      console.log("FROM THE ADD COMPONENT IT EVALUATES THE ALARM FINISHED AS... "+ finished);
    this.task = {
      "name":this.addTaskForm.value.title,
      "discription":this.addTaskForm.value. discription,
      "start": this.addTaskForm.value.time.start,
      "end": this.addTaskForm.value.time.end,
      "category":this.addTaskForm.value.category,
      "started": started,
      "finished": finished,
    }
    console.log(JSON.stringify(this.addTaskForm.value));
    this._taskService.addTask(this.task);

  }
  ngOnInit() {
    this.addTaskForm = new FormGroup({
      title: new FormControl(),
      discription: new FormControl(),
      category: new FormControl(),
      time: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      }),
    })
  }

}
