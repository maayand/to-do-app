import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propNames: string[]): any {
    if(value.length === 0 || filterString === '' ){
      return value;
    }
    const resultArr = [];
    for( const item of value){
      for(const propName of propNames){
        if(item[propName].toLowerCase().includes(filterString.toLowerCase())){
          resultArr.push(item);
          break;
        }
      }
    }
    return resultArr;
  }

}
