import { Injectable } from '@angular/core';
import {task} from '../shared/task.model';
import {SAVED_TASKS} from '../shared/tasks';

@Injectable()
export class TaskService {

  constructor() { }

  getTasks():task[]{
    return SAVED_TASKS.slice(0);//return the whole array starting from index 0 using slice
  }
  getTotalTasks(allTasks:task[]){
    return allTasks.length;//return the number of all tasks.
  }
  getRemainingTasks()
  {
    let completed =0;
      SAVED_TASKS.forEach(
        (task)=>{if(task.finished){completed +=1;}
    });
     return this.getTotalTasks(SAVED_TASKS)-completed;
  }

addTask(newTask:task){
  let current = new Date();
  (newTask.start.getTime() < current.getTime())?newTask.started=true:newTask.started=false;
  (newTask.end.getTime() < current.getTime())?newTask.finished=true:newTask.finished=false;
   newTask.start.setSeconds(0);
   newTask.end.setSeconds(0);// needed to calibrate time right.
   SAVED_TASKS.push(newTask);
   SAVED_TASKS.sort((a,b)=>{
        return new Date(a.start).getTime() - new Date(b.start).getTime();
   });
}




}
