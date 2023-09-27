import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'dateuser'
})
export class DateuserPipe implements PipeTransform {
  transform(value: any): any {
    const datePipe = new DatePipe("en-US");
    return datePipe.transform(value, "yyyy-MM-dd");
  }

}
