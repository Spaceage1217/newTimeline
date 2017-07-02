export interface task{
  name: string;
  discription?:string;
  start:Date;
  end: Date;
  category: number;
  meridiem: string;
  started: boolean;
  finished: boolean;
}
