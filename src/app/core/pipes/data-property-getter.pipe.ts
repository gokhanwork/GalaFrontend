import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: unknown[]): unknown {
    var arr = keyName.split(".");
    var val = object;
    for (var i = 0; i < arr.length; i++) {
        val = val[arr[i]];
    }
    if(val){
      return val;
    }
    return keyName;
  }

}
