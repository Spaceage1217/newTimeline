import { Component, OnInit, EventEmitter,ViewChild,Pipe } from '@angular/core';
import {task} from '../shared/task.model';
import{TaskService} from "../services/task.service";
import {ShortString} from "../shared/shortString.pipe";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],




})
export class ListComponent implements OnInit {

  tasks:task[];
  totalTasks:number;
  hour:string ="-";
  minute:any ="-";
  second:any="-" ;
  snapShot_name: string;
  snapShot_background:number;
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
    //this.current = new Date();
     var that = this; //saving the this reference to that...do not delete
       that.tasks.forEach(function(alarm, index){
           var time = setInterval(function() {
             this.current = new Date();


               if((alarm.start.getHours()==this.current.getHours()&&alarm.start.getMinutes()==this.current.getMinutes())&&!alarm.started){
                    console.log(alarm.name+" has started");
                    alarm.started=true;
                  }
                  else if((alarm.end.getHours()==this.current.getHours()&&alarm.end.getMinutes()==this.current.getMinutes())&&!alarm.finished){
                    console.log(alarm.name+" has ended");
                    alarm.started=false;
                    alarm.finished=true;
                  }
                if((alarm.started)&&!alarm.finished){
                  console.log("alarm started should be true ...."+ alarm.started);
                  console.log("alarm should be finished.." +alarm.finished);
                    that.snapShot_name=alarm.name;
                    that.snapShot_background=alarm.category;//background is equal to the alarm category
                    var distance = alarm.end.getTime()-this.current.getTime();
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    that.hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+"H";
                    that.minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))+"M";
                    that.second = Math.floor((distance % (1000 * 60)) / 1000)+"S";
                }
                else if(alarm.finished){
                  // display FIN when finished
                  that.snapShot_name="";
                  that.snapShot_background=0;
                  that.hour ="F"; that.minute="I"; that.second="N";
                  clearInterval(time);
              };



                }, 1000)
       })}







 showSnap( index: number){
    this.snapShot_name= this.tasks[index].name;
  }


}
