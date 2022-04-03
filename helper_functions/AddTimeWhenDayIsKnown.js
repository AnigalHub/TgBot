"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateAsString_1 = require("../helper_functions/DateAsString");
var ConvertTime_1 = __importDefault(require("../ConvertTime"));
var convertTime = new ConvertTime_1.default();
//функция добавления времени, когда известен день
function AddTimeWhenDayIsKnown(bot, chatId, date, array, secondKeywordInMessage, millisecondsTime, messageFuture) {
    if (array.includes('в') == true || array.includes('во') == true) {
        if (array.includes('во') == true) {
            array.splice(array === null || array === void 0 ? void 0 : array.indexOf('во'), 1, 'в');
        }
        secondKeywordInMessage = array === null || array === void 0 ? void 0 : array.indexOf('в');
        if (millisecondsTime >= 86400000 && convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 2], 1) < 86400000) {
            var futureDate = new Date(Date.parse(date.toString()) + millisecondsTime);
            futureDate.setHours(0, 0, 0, 0);
            if (/^[0-9]*$/.test(array[secondKeywordInMessage + 1]) == true) { //только цифры
                var timeAfterSecondKeyword = parseInt(array[secondKeywordInMessage + 1]); //время с типом число
                if (timeAfterSecondKeyword == 0) {
                    timeAfterSecondKeyword = 24;
                }
                if (convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 2], timeAfterSecondKeyword) == 0) { //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                }
                else if (timeAfterSecondKeyword > 24 && convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 2], 1) >= 3600000) {
                    bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                }
                else {
                    messageFuture = array.slice((secondKeywordInMessage + 3), array.length).join(' '); //сообщение, которое напоминаем
                    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(date.getHours(), futureDate.getHours(), timeAfterSecondKeyword, array, secondKeywordInMessage + 2);
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                }
            }
            else if (/^[А-яЁё]*$/.test(array[secondKeywordInMessage + 1]) == true) { // только буквы
                if (convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 1], 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 2], 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 3], 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(array[secondKeywordInMessage + 4], 1) == 0) {
                    bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                }
                else {
                    var timeAfterSecondKeyword = convertTime.ConvertLargeNumberFromStringToNumber(array[secondKeywordInMessage + 1], array[secondKeywordInMessage + 2]);
                    var objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(timeAfterSecondKeyword, date.getTime(), futureDate.getTime(), array, secondKeywordInMessage + 1, secondKeywordInMessage + 2, secondKeywordInMessage + 3, secondKeywordInMessage + 4);
                    messageFuture = objTime.message;
                    millisecondsTime = objTime.millisecondsTime;
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                }
            }
            else {
                bot.sendMessage(chatId, 'Ошибка! Некорректно введено время');
            }
        }
        else {
            bot.sendMessage(chatId, 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
        }
    }
    else {
        setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
        (0, DateAsString_1.DateAsString)(millisecondsTime, date);
    }
}
exports.default = AddTimeWhenDayIsKnown;
//# sourceMappingURL=AddTimeWhenDayIsKnown.js.map