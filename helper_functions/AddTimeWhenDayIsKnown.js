"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateAsString_1 = require("./DateAsString");
var ConvertTime_1 = __importDefault(require("../ConvertTime"));
var convertTime = new ConvertTime_1.default();
var MessageToSend_1 = __importDefault(require("../MessageToSend"));
//функция добавления времени, когда известен день
function addTimeWhenDayIsKnown(date, words, secondKeywordInMessage, millisecondsTime, messageFuture) {
    if (words.includes('в') == true || words.includes('во') == true) {
        if (words.includes('во') == true) {
            words.splice(words.indexOf('во'), 1, 'в');
        }
        secondKeywordInMessage = words.indexOf('в'); // номер ключевого слова в массиве
        var arrayElementAfterSecondKeyword1 = words[(secondKeywordInMessage) + 1]; // элемент массива после ключевого слова (secondKeywordInMessage) - первый
        var arrayElementAfterSecondKeyword2 = words[(secondKeywordInMessage) + 2]; // элемент массива после ключевого слова (secondKeywordInMessage) - второй
        var arrayElementAfterSecondKeyword3 = words[(secondKeywordInMessage) + 3]; // элемент массива после ключевого слова (secondKeywordInMessage) - третий
        var arrayElementAfterSecondKeyword4 = words[(secondKeywordInMessage) + 4]; // элемент массива после ключевого слова (secondKeywordInMessage) - четвертый
        if (millisecondsTime >= 86400000 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2, 1) < 86400000) {
            var futureDate = new Date(Date.parse(date.toString()) + millisecondsTime);
            futureDate.setHours(0, 0, 0, 0);
            var dateMs = Date.parse(date.toString()); //дата сообщения в миллисекундах
            var futureDateMs = Date.parse(futureDate.toString()); //будущая дата в миллисекундах
            if (/^[0-9]*$/.test(words[secondKeywordInMessage + 1])) { //только цифры
                var timeAfterSecondKeyword = parseInt(arrayElementAfterSecondKeyword1); //время с типом число
                if (timeAfterSecondKeyword == 0) {
                    timeAfterSecondKeyword = 24;
                }
                if (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2, timeAfterSecondKeyword) == 0) { //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                    throw new Error('Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                }
                else if (timeAfterSecondKeyword > 24 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2, 1) >= 3600000) {
                    throw new Error('Ошибка! Время не может быть больше 24');
                }
                else {
                    messageFuture = words.slice((secondKeywordInMessage + 3), words.length).join(' '); //сообщение, которое напоминаем
                    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(dateMs, futureDateMs, timeAfterSecondKeyword, words, secondKeywordInMessage + 2);
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                    return new MessageToSend_1.default(millisecondsTime, messageFuture);
                }
            }
            else if (/^[А-яЁё]*$/.test(words[secondKeywordInMessage + 1])) { // только буквы
                if (convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword1, 1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword2, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword3, 1) == 0 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterSecondKeyword4, 1) == 0) {
                    throw new Error('Ошибка! Не указана единица времени');
                }
                else {
                    var timeAfterSecondKeyword = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterSecondKeyword1, arrayElementAfterSecondKeyword2);
                    var objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(timeAfterSecondKeyword, dateMs, futureDateMs, words, secondKeywordInMessage + 1, secondKeywordInMessage + 2, secondKeywordInMessage + 3, secondKeywordInMessage + 4);
                    messageFuture = objTime.message;
                    millisecondsTime = objTime.millisecondsTime;
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                    return new MessageToSend_1.default(millisecondsTime, messageFuture);
                }
            }
            else {
                throw new Error('Ошибка! Некорректно введено время');
            }
        }
        else {
            throw new Error('Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
        }
    }
    else {
        (0, DateAsString_1.DateAsString)(millisecondsTime, date);
        return new MessageToSend_1.default(millisecondsTime, messageFuture);
    }
}
exports.default = addTimeWhenDayIsKnown;
//# sourceMappingURL=AddTimeWhenDayIsKnown.js.map