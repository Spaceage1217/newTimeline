import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {task} from '../../shared/task.model';
import{TaskService} from "../../services/task.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})


export class AddComponent implements OnInit {

  constructor(private _taskService:TaskService) { }
  start: Date = new Date();
  end: Date = new Date();
  task:task;
  addTime(title:string, discription:string, category:number, taskStart: Date,taskEnd: Date)
  {
    this.task = {
      "name":title,
      "discription": discription,
      "start": taskStart,
      "end": taskEnd,
      "category":category,
      "meridiem": "PM",
      "started": false,
      "finished": false,
    }
    this._taskService.addTask(this.task);
    console.log('my title' + title);
    console.log('my discription' + discription);
    console.log('my category' + category);
    console.log('MY start '+ (taskStart.getHours()-12));
    console.log('MY start '+ taskStart.getMinutes());
    console.log('My end '+ (taskEnd.getHours()-12));
    console.log('My end '+ taskEnd.getMinutes())
  }
  ngOnInit() {
  }

}
