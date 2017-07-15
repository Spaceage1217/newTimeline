import { Component, OnInit, EventEmitter,ViewChild,Pipe } from '@angular/core';
import {task} from '../shared/task.model';
import{TaskService} from "../services/task.service";
import {ShortString} from "../shared/shortString.pipe";
import{AuthenticationService } from '../services/authentication.service';
import{AppointmentService} from '../services/appointment.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  tasks:task[];
  totalTasks:number;
  hour:string =".";
  minute:any =".";
  second:any="." ;
  //Usefull object for displaying properties of taskt o dom.
  snapShot={
    name:'Start  ',
    background:0,
    progress:{
      started: false,
      finished: false,
    },
    open: false,
    remaining: 0,
  }
  current: Date;
  appointments: Array<string>;
  distance:number = 0;

  constructor(private _taskService: TaskService, private _auth:AuthenticationService ,private _appointments:AppointmentService ) {
    this.appointments = ['please refresh view'];
  }

  refreshAppointments() {
		/*
		 * loading the appointments is done asychronously. the service's loadAppointments() method
		 * returns a Promise that provides access to the newly loaded set of appointments. Updating
		 * the array of appointments triggers angular's one-way-binding between the field and the
		 * widget.
		 */
		this._appointments.loadAppointments().then((newAppointments) => {
			// clean the array of existing appointments
			this.appointments.splice(0, this.appointments.length);
			// copy all new items to the array of existing appointments
			this.appointments.push.apply(this.appointments, newAppointments);
			console.log('displaying ' + this.appointments.length + ' appointments')
		});
	}

  ngOnInit() {
    this.tasks = this._taskService.getTasks();//get tasks from service
    this.totalTasks = this._taskService.getTotalTasks(this.tasks);//return total tasks in tasks array
    this.startAlarm();
  }

   startAlarm(){
     let snapShot=this.snapShot;// to shorten the name for readability
     var that = this; //saving the this reference to that...do not delete
       that.tasks.forEach(function(alarm, index){


          that.current = new Date();//using for progress bar might not be necessary
          that.distance = (alarm.end.getTime()-that.current.getTime())/1000;
          snapShot.progress.started=alarm.started;
            console.log("DISTANCE IS "+Math.ceil(that.distance));
           var time = setInterval(function() {
                  this.current = new Date();//create a new date object so your constantly checking for a new time.
               if((alarm.start.getHours()==this.current.getHours()&&alarm.start.getMinutes()==this.current.getMinutes())&&!alarm.started){
                    alarm.started=true;
                    snapShot.progress.started= true;
                  }
                  else if((alarm.end.getHours()==this.current.getHours()&&alarm.end.getMinutes()==this.current.getMinutes())&&!alarm.finished){
                    alarm.started=false;
                    alarm.finished=true;
                    snapShot.progress.started=false;
                    snapShot.progress.finished=true;
                  }
                if((alarm.started)&&!alarm.finished){
                    snapShot.name=alarm.name;
                    snapShot.background=alarm.category;//background is equal to the alarm category
                    var distance = alarm.end.getTime()-this.current.getTime();
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    that.hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+"H";
                    that.minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))+"M";
                    that.second = Math.floor((distance % (1000 * 60)) / 1000)+"S";

                }
                else if(alarm.finished){
                  // display FIN when finished
                  //delaly the reset by 1 second so animation can show
                  setTimeout(()=>{
                    snapShot.name="Done";
                    snapShot.background=0;
                    that.hour ="."; that.minute="."; that.second=".";
                    clearInterval(time);
                  },2000)

              };
                }, 1000)
       })}







 toggleSnap(){
   //logic as far as css is kind of jacked up and goes the other way you would think...but as is it works.
   //when snapShot.open = false then the snap shot takes up half the screen.
   //and the timeline 'line' is in full view. and vice versa when snapShot.open is true.
    (this.snapShot.open)?this.snapShot.open=false:this.snapShot.open=true;
  }


}
