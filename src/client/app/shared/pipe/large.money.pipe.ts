import { Component, Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'largeMoney' })
export class LargeMoneyPipe implements PipeTransform {

    transform(value: number): string {
        var newValue:any = value;
        if (value >= 1000) {
            value = Math.round(value);
            var suffixes = ["", "K", "M", "B", "T"];
            var suffixNum = Math.floor(("" + value).length / 3);
            var shortValue:any, shortNum ;
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0) shortNum = shortValue.toFixed(1);
           return shortValue + suffixes[suffixNum];
        }
        return newValue;
    }
}