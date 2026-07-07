import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatToK',
  standalone: true
})
export class FormatToKPipe implements PipeTransform {

transform(value: number): string | number {
    if (value >= 1000) {
      return Math.floor(value / 1000) + 'K';
    }
    return value;
  }

}
