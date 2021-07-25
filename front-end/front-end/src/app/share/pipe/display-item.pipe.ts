import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'display'
})

export class DisplayItem implements PipeTransform{
    transform(value: [], row: number) {
        const newArray: []= [];
        if((row+1)*4<=value.length){
            for(var i=row*4;i<row*4+4;i++){
                newArray[i-row*4] = value[i];
            }
        }else{
            for(var i=row*4;i<value.length;i++){
                newArray[i-row*4] = value[i];
            }
        }
        return newArray;
    }
    
}