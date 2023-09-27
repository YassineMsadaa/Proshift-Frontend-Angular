import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(time: number): string {
    const hours = Math.floor(time);
    const minutes = Math.floor((time * 60) % 60);
    const seconds = Math.floor((time * 3600) % 60);

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
