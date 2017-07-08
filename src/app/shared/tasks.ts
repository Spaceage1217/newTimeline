import {task} from './task.model';


export const SAVED_TASKS:task[] =[
 {
    "name":" Finish TL",
    "discription": "working on application",
    "start": setDate(),
    "end": setDate(),
    "category":2,
    "started": true,
    "finished": true,
  },
  {
     "name":" Work on conduit",
     "discription": "working on application thats really really really really really really really good",
     "start": setDate(),
     "end": setDate(),
     "category":2,
     "started": false,
     "finished": false,
   },
   {
      "name":" Finish TL",
      "discription": "working on application",
      "start":  setDate(),
      "end": setDate(),
      "category":2,
      "started": false,
      "finished": false,
    },
    {
       "name":" Finish TL",
       "discription": "working on application",
       "start": setDate(),
       "end": setDate(),
       "category":2,
       "started": true,
       "finished": true,
     },

]

function setDate() {
    var start = new Date();
    start.setHours(4);
    start.setMinutes(3);
    return start;

}
