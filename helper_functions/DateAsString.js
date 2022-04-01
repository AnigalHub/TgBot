"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateAsString = void 0;
/*функция расчета будущей даты и времени*/
function DateAsString(time, date) {
    var timeFuture = Date.parse(date.toString()) + time;
    var d = new Date(timeFuture);
    console.log(d.toString()); // точная дата ( день недели | дата | время)
}
exports.DateAsString = DateAsString;
//# sourceMappingURL=DateAsString.js.map