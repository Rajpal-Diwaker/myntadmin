import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateAgo',
  pure: true
})

export class DateAgoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(value){
      return moment(Number(value)).fromNow(true)
    }
  }
}
