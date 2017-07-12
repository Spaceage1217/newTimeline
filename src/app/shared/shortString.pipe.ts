import { Pipe, PipeTransform } from '@angular/core';
/*
  Takes a string and replaces it with a shortend version based on the length you give it if its greater than 14 char for Example
  someString = "hey whats up my name is Bob and im from Bob town"
  {{value | shortString : length of new string}}
  {{someString | shortString: 10}}
*/
@Pipe({name: 'shortString'})
export class ShortString implements PipeTransform {
  transform(value: any, length: number): string {
    if(!value){return ""};// if null return an empty string.
    console.log('expected new string '+value.slice(0,length)+'...');
    return (value.length>14)?value.slice(0,length)+'...': value;
  }
}
