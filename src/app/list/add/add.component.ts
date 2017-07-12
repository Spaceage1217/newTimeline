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

  onSubmit()
  {
    console.log(JSON.stringify(this.addTaskForm.value));
    if(!this.addTaskForm.value.time.start){this.addTaskForm.value.time.start= new Date();}// if nothing is selected for start or end then select the curent time for star or end
    if(!this.addTaskForm.value.time.end){this.addTaskForm.value.time.end= new Date();}
    
    this.task = {
      "name":this.addTaskForm.value.title,
      "discription":this.addTaskForm.value.discription,
      "start": this.addTaskForm.value.time.start,
      "end": this.addTaskForm.value.time.end,
      "category":this.addTaskForm.value.category,
      "started": false,
      "finished": false,
    }
    console.log(this.task.start);
    console.log(JSON.stringify(this.addTaskForm.value));
    this._taskService.addTask(this.task);
    this.addTaskForm.reset();

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
