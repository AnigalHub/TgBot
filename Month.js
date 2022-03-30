"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Month = /** @class */ (function () {
    function Month(monthInMessage) {
        this.month = monthInMessage;
    }
    /*поиск индекса (номера) месяца*/
    Month.prototype.SearchForTheNumberOfTheMonth = function () {
        var indexArray;
        var array;
        if (this.month == 'январь' || this.month == 'февраль' || this.month == 'март' || this.month == 'апрель'
            || this.month == 'май' || this.month == 'июнь' || this.month == 'июль' || this.month == 'август'
            || this.month == 'сентябрь' || this.month == 'октябрь' || this.month == 'ноябрь' || this.month == 'декабрь') {
            array = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        }
        else if (this.month == 'янв' || this.month == 'фев' || this.month == 'мар' || this.month == 'апр'
            || this.month == 'май' || this.month == 'июн' || this.month == 'июл' || this.month == 'авг'
            || this.month == 'сен' || this.month == 'окт' || this.month == 'ноя' || this.month == 'дек') {
            array = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        }
        else if (this.month == 'янв' || this.month == 'февр' || this.month == 'март' || this.month == 'апр'
            || this.month == 'май' || this.month == 'июнь' || this.month == 'июль' || this.month == 'авг'
            || this.month == 'сент' || this.month == 'октб' || this.month == 'нояб' || this.month == 'дек') {
            array = ['янв', 'февр', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'октб', 'нояб', 'дек'];
        }
        else if (this.month == 'январе' || this.month == 'феврале' || this.month == 'марте' || this.month == 'апреле'
            || this.month == 'мае' || this.month == 'июне' || this.month == 'июле' || this.month == 'августе'
            || this.month == 'сентябре' || this.month == 'октябре' || this.month == 'ноябре' || this.month == 'декабре') {
            array = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];
        }
        else {
            array = [];
        }
        indexArray = array.indexOf(this.month);
        return indexArray;
    };
    /*разница между месяцами(когда указано время в сообщении)*/
    Month.prototype.DiffMonth = function () {
        var date = new Date();
        var numberOfTheMonth = this.SearchForTheNumberOfTheMonth();
        var differenceInMonths;
        if (date.getMonth() > numberOfTheMonth) {
            differenceInMonths = 12 - date.getMonth() + numberOfTheMonth;
        }
        else if (date.getMonth() < numberOfTheMonth) {
            differenceInMonths = numberOfTheMonth - date.getMonth();
        }
        else {
            differenceInMonths = 12;
        }
        return differenceInMonths;
    };
    return Month;
}());
exports.default = Month;
//# sourceMappingURL=Month.js.map