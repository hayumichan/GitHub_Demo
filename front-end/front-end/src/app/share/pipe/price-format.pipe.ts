import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'format'
})

export class FormatPrice implements PipeTransform {
    transform(value: any) {
        var parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(".") + " Đồng";
    }
}