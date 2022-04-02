"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DayOfTheWeek = /** @class */ (function () {
    function DayOfTheWeek(dayOfTheWeekInMessage) {
        this.dayOfTheWeek = dayOfTheWeekInMessage;
    }
    //поиск индекса (номера) дня недели
    DayOfTheWeek.prototype.SearchForTheDayNumberOfTheWeek = function () {
        var indexArray;
        var array;
        if (this.dayOfTheWeek == 'вс' || this.dayOfTheWeek == 'пн' || this.dayOfTheWeek == 'вт' || this.dayOfTheWeek == 'ср' || this.dayOfTheWeek == 'чт' || this.dayOfTheWeek == 'пт' || this.dayOfTheWeek == 'сб') {
            array = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
        }
        else if (this.dayOfTheWeek == 'вск' || this.dayOfTheWeek == 'пнд' || this.dayOfTheWeek == 'втр' || this.dayOfTheWeek == 'сре' || this.dayOfTheWeek == 'чтв' || this.dayOfTheWeek == 'птн' || this.dayOfTheWeek == 'суб') {
            array = ['вск', 'пнд', 'втр', 'сре', 'чтв', 'птн', 'суб'];
        }
        else if (this.dayOfTheWeek == 'воскресенье' || this.dayOfTheWeek == 'понедельник' || this.dayOfTheWeek == 'вторник' || this.dayOfTheWeek == 'среда' || this.dayOfTheWeek == 'четверг' || this.dayOfTheWeek == 'пятница' || this.dayOfTheWeek == 'суббота') {
            array = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'cуббота'];
        }
        else if (this.dayOfTheWeek == 'воскресенье' || this.dayOfTheWeek == 'понедельник' || this.dayOfTheWeek == 'вторник' || this.dayOfTheWeek == 'среду' || this.dayOfTheWeek == 'четверг' || this.dayOfTheWeek == 'пятницу' || this.dayOfTheWeek == 'субботу') {
            array = ['воскресенье', 'понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'cубботу'];
        }
        else {
            array = [];
        }
        indexArray = array.indexOf(this.dayOfTheWeek);
        return indexArray;
    };
    //разница между днями недели (когда указано время в сообщении)
    DayOfTheWeek.prototype.DiffDaysOfTheWeek = function () {
        var date = new Date();
        var numberOfTheWeekDayMessage = this.SearchForTheDayNumberOfTheWeek();
        var differenceDaysOfTheWeek;
        if (date.getDay() > numberOfTheWeekDayMessage) {
            differenceDaysOfTheWeek = 7 - date.getDay() + numberOfTheWeekDayMessage;
        }
        else if (date.getDay() < numberOfTheWeekDayMessage) {
            differenceDaysOfTheWeek = numberOfTheWeekDayMessage - date.getDay();
        }
        else {
            differenceDaysOfTheWeek = 7;
        }
        return differenceDaysOfTheWeek;
    };
    return DayOfTheWeek;
}());
exports.default = DayOfTheWeek;
//# sourceMappingURL=DayOfTheWeek.js.map