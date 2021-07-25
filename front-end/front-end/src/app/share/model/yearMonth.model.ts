export class YearMonth {
    constructor(private year: number, private months: number, private count: number) { }

    getYear() {
        return this.year;
    }

    getMonths() {
        return this.months;
    }

    getCount() {
        return this.count;
    }

    setCount(count: number){
        this.count = count;
    }

    getYearMonth() {
        return this.year + '' + this.months;
    }
}