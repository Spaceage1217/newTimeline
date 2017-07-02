import { Component, OnInit, EventEmitter } from '@angular/core';
import {task} from '../shared/task.model';
import{TaskService} from "../services/task.service";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tasks:task[];
  totalTasks:number;
  hour:any ="-";
  minute:any ="-";
  second:any="-" ;
  snapShot_name: string;
  //might not need-->started: false;
  current : Date;

  constructor(private _taskService: TaskService) {
  }

  ngOnInit() {
    this.tasks = this._taskService.getTasks();//get tasks from service
    this.totalTasks = this._taskService.getTotalTasks(this.tasks);//return total tasks in tasks array
    this.startAlarm();
  }

  startAlarm(){
     this.current = new Date();
     var that = this; //saving the this reference to that...do not delete
     that.tasks.forEach(function(alarm, index){
       if(alarm.meridiem=='PM'){
        // alarm.start.setHours()+=12;
         //alarm.endHrs+=12;
       }
     var time = setInterval(function() {

       this.current = new Date();

        if(alarm.start.getHours()==this.current.getHours()&&alarm.start.getMinutes()==this.current.getMinutes()){
        	console.log("task started");
           alarm.started=true;
           that.snapShot_name = alarm.name;
           }
           else if(alarm.end.getHours()==this.current.getHours()&&alarm.end.getMinutes()==this.current.getMinutes()){
        	console.log("task ended");
           alarm.started=false;
           }
         if(alarm.started){
           that.hour = (alarm.end.getHours()-(this.current.getHours()+1))+"H";
           if(alarm.end.getMinutes()-(this.current.getMinutes()+1)<0)
           {
             that.minute=(60-this.current.getMinutes()) + "M" ;

           }
           else{ that.minute=(alarm.end.getMinutes()-(this.current.getMinutes()+1)) + " M"}
           that.second=(60-this.current.getSeconds()) + "S" ;
         }
         else ( document.getElementById("started").innerHTML =" task finished");

          }, 1000)
     })}







 showSnap( index: number){
    this.snapShot_name= this.tasks[index].name;
  }


}
