export class YearMonthDate {
    constructor(private year: number, private months: number, private date: number, private count: number) { }

    getYear() {
        return this.year;
    }

    getMonths() {
        return this.months;
    }

    getDate() {
        return this.date;
    }

    getCount() {
        return this.count;
    }

    setCount(count: number) {
        this.count = count;
    }

    getYearMonthDate() {
        return this.year + '/' + this.months + '/' + this.date;
    }
}