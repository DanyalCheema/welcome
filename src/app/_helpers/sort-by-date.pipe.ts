import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      return value.sort((o1, o2) => {
        return (new Date(o2.placedAt) as any) - (new Date(o1.placedAt) as any);
      });
  }

}
