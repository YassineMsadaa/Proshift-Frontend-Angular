import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeOnly'
})
export class TimeOnlyPipe implements PipeTransform {
  transform(value: Date | null): string {
    const datePipe = new DatePipe('en-US');
    return value ? datePipe.transform(value, 'HH:mm:ss') ?? '' : '';
  }
}
