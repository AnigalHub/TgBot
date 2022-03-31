"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("./config.json"));
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var ConvertTime_1 = __importDefault(require("./ConvertTime"));
var DayOfTheWeek_1 = __importDefault(require("./DayOfTheWeek"));
var token = config_json_1.default.token;
var bot = new node_telegram_bot_api_1.default(token, { polling: true, baseApiUrl: "https://api.telegram.org" });
var convertTime = new ConvertTime_1.default();
/*функция добавления времени, когда известен день*/
function AddTimeWhenDayIsKnown(chatId, array, secondKeywordInMessage, millisecondsTime, messageFuture) {
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
                    millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(date, futureDate, timeAfterSecondKeyword, array, secondKeywordInMessage + 2);
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    CalculationOfFutureDateAndTime(millisecondsTime); //дата в которую напоминаем сообщение
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
                    CalculationOfFutureDateAndTime(millisecondsTime); //дата в которую напоминаем сообщение
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
        CalculationOfFutureDateAndTime(millisecondsTime); //дата в которую напоминаем сообщение
    }
}
/*функция расчета будущей даты и времени*/
function CalculationOfFutureDateAndTime(time) {
    var timeFuture = Date.parse(date.toString()) + time;
    var d = new Date(timeFuture);
    console.log(d.toString()); // точная дата ( день недели | дата | время)
}
/*дата в данную минуту*/
var date = new Date();
console.log(date.toString()); // день недели | дата | время
bot.on('message', function (msg) {
    date = new Date();
    var chatId = msg.chat.id; //id
    console.log(chatId);
    console.log(msg.date);
    var timeMessage = msg.date;
    var c = new Date(timeMessage * 1000);
    console.log('дата сообщения', c.toString()); // точная дата ( день недели | дата | время)
    var text = msg.text;
    if (text != (text === null || text === void 0 ? void 0 : text.toLocaleLowerCase())) {
        text = text === null || text === void 0 ? void 0 : text.toLocaleLowerCase();
    }
    var words = text === null || text === void 0 ? void 0 : text.split(" "); //разбиение на элементы массива, "пробел"
    if ((words === null || words === void 0 ? void 0 : words.includes('')) == true) {
        words = words === null || words === void 0 ? void 0 : words.filter(function (el) {
            return (el != "");
        });
    }
    console.log(words); //массив
    var keywordInMessage; //ключевое слово в сообщении
    var secondKeywordInMessage = 0; //ключевое слово в сообщении
    var millisecondsTime = 0; //миллисекунды - через сколько надо прислать сообщение
    var messageFuture; //сообщение, которое напоминаем
    if (words != undefined) {
        if (words.includes('через') == true) {
            keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf('через'); //индекс ключевого слова в массиве
            if (/^[0-9]*$/.test(words[keywordInMessage + 1]) == true) { // только цифры
                var time = parseInt(words[keywordInMessage + 1]); //время с типом число
                messageFuture = words.slice((keywordInMessage + 3), words.length).join(' '); //сообщение, которое напоминаем
                millisecondsTime = convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 2], time); //миллисекунды - через сколько надо прислать сообщение
                if (time == 0) {
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
                }
                else if (millisecondsTime == 0) { /*если такого времени нет и произошла ошибка и вернулся 0*/
                    bot.sendMessage(chatId, 'Ошибка! Отсутствует или некорректно указана единица времени');
                }
                else {
                    console.log(messageFuture);
                    //  AddTimeWhenDayIsKnown(chatId,words,secondKeywordInMessage,millisecondsTime,messageFuture)
                }
            }
            else if (/^[А-яЁё]*$/.test(words[keywordInMessage + 1]) == true) { // только буквы
                if (words[keywordInMessage + 1] == 'ноль' || words[keywordInMessage + 1] == 'нуль') {
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
                }
                else if (convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 1], 1) == 0 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 2], 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 3], 1) == 0 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 4], 1) == 0) {
                    bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                }
                else {
                    var time = convertTime.ConvertLargeNumberFromStringToNumber(words[keywordInMessage + 1], words[keywordInMessage + 2]);
                    var objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, timeMessage, timeMessage, words, keywordInMessage + 1, keywordInMessage + 2, keywordInMessage + 3, keywordInMessage + 4);
                    messageFuture = objTime.message;
                    millisecondsTime = objTime.millisecondsTime;
                    console.log(messageFuture);
                    console.log(millisecondsTime);
                    AddTimeWhenDayIsKnown(chatId, words, secondKeywordInMessage, millisecondsTime, messageFuture);
                }
            }
            else {
                bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Ввод времени указывается словом или числом. Пример: неделю/месяц | 12 минут/пять часов ');
            }
        }
        else if (words.includes('в') == true || words.includes('во') == true) {
            if (words.includes('во') == true) {
                words.splice(words === null || words === void 0 ? void 0 : words.indexOf('во'), 1, 'в');
            }
            keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf('в'); //индекс ключевого слова в массиве
            if (/^[0-9]*$/.test(words[keywordInMessage + 1]) == true) { // только цифры
                var time = parseInt(words[keywordInMessage + 1]); //время с типом число
                if (time == 0) {
                    time = 24;
                }
                if (time > 24 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 2], 1) >= 3600000) {
                    bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                }
                else if (convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 2], time) == 0) { //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
                }
                else if (!words[keywordInMessage + 3]) {
                    bot.sendMessage(chatId, 'Ошибка! Не указана дата');
                }
                else {
                    if (/[А-яЁё]/.test(words[keywordInMessage + 3]) == true) { // только буквы
                        if ((words[keywordInMessage + 3]) == "в" || (words[keywordInMessage + 3]) == "во") {
                            var dayOfTheWeek = new DayOfTheWeek_1.default(words[keywordInMessage + 4]);
                            if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1) {
                                var differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek();
                                var futureDay = date.getDate() + differenceInDays;
                                var futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                                var futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 2], time);
                                var futureDateAndTime = new Date(futureMs);
                                millisecondsTime = futureDateAndTime.getTime() - date.getTime();
                                messageFuture = words.slice((keywordInMessage + 5), words.length).join(' '); //сообщение, которое напоминаем
                                setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                                CalculationOfFutureDateAndTime(millisecondsTime);
                            }
                        }
                        else {
                            var futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(words[keywordInMessage + 3]);
                            if ((time < date.getHours()) && words[keywordInMessage + 3] == 'сегодня') {
                                bot.sendMessage(chatId, 'Ошибка! Время указано которое уже прошло - напомнить невозможно');
                            }
                            else if (convertTime.ConvertTimeToMilliseconds(words[secondKeywordInMessage + 3], 1) >= 3600000) {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
                            }
                            else if (futureDay == -1) {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Время указано, а дата нет.');
                            }
                            else {
                                var futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                                millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(date, futureDate, time, words, keywordInMessage + 2);
                                messageFuture = words.slice((keywordInMessage + 4), words.length).join(' '); //сообщение, которое напоминаем
                                setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                                CalculationOfFutureDateAndTime(millisecondsTime);
                            }
                        }
                    }
                    else if (/[А-яЁё]/.test(words[keywordInMessage + 3]) == false && (words[keywordInMessage + 3].includes('.') == true ||
                        words[keywordInMessage + 3].includes('-') == true || words[keywordInMessage + 3].includes('/') == true)) {
                        if (words[keywordInMessage + 3][2] != words[keywordInMessage + 3][5] &&
                            (words[keywordInMessage + 3][2] != '.' || words[keywordInMessage + 3][2] != '-' || words[keywordInMessage + 3][2] != '/') &&
                            (words[keywordInMessage + 3][5] != '.' || words[keywordInMessage + 3][5] != '-' || words[keywordInMessage + 3][5] != '/') ||
                            (words[keywordInMessage + 3].length > 10) ||
                            (words[keywordInMessage + 3].length == 7) ||
                            (words[keywordInMessage + 3].length == 9)) {
                            bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Опечатка в дате!');
                        }
                        else {
                            var yearMessage = void 0;
                            if (words[keywordInMessage + 3].length == 10) {
                                yearMessage = parseInt(words[keywordInMessage + 3].substring(6, 12));
                            }
                            else if ((words[keywordInMessage + 3].length == 8) && (String(date.getFullYear()).slice(2, 4) <= words[keywordInMessage + 3].substring(6, 8))) {
                                yearMessage = parseInt(String(date.getFullYear()).slice(0, 2) + words[keywordInMessage + 3].substring(6, 8));
                            }
                            else {
                                yearMessage = parseInt(String(parseInt(String(date.getFullYear()).slice(0, 2)) + 1) + words[keywordInMessage + 3].substring(6, 8));
                            }
                            var monthMessage = parseInt(words[keywordInMessage + 3].substring(3, 6)) - 1;
                            var dayMessage = parseInt(words[keywordInMessage + 3].substring(0, 2));
                            var futureDate = new Date(yearMessage, monthMessage, dayMessage);
                            messageFuture = words.slice((keywordInMessage + 4), words.length).join(' '); //сообщение, которое напоминаем
                            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(date, futureDate, time, words, keywordInMessage + 2);
                            setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                            CalculationOfFutureDateAndTime(millisecondsTime); /*дата в которую напоминаем сообщение*/
                        }
                    }
                    else {
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | пт | субботу | 21.05.22 | 21-05-22 | 21/05/22 ');
                    }
                }
            }
            else if (/^[А-яЁё]*$/.test(words[keywordInMessage + 1]) == true) { // только буквы
                var dayOfTheWeek = new DayOfTheWeek_1.default(words[keywordInMessage + 1]);
                if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1) {
                    var differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek();
                    var futureDay = date.getDate() + differenceInDays;
                    var futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                    if (words[keywordInMessage + 2] == "в") {
                        if (/^[А-яЁё]*$/.test(words[keywordInMessage + 3]) == true) {
                            if (convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 3], 1) == 0 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 4], 1) == 0 &&
                                convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 5], 1) == 0 && convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 6], 1) == 0) {
                                bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                            }
                            else if (millisecondsTime < -1 || millisecondsTime == 0) {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно указано время');
                            }
                            else {
                                var time = convertTime.ConvertLargeNumberFromStringToNumber(words[keywordInMessage + 3], words[keywordInMessage + 4]);
                                if (words[keywordInMessage + 3] == 'ноль' || words[keywordInMessage + 3] == 'нуль') {
                                    time = 24;
                                }
                                //   let objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time,date,futureDate,words,keywordInMessage+3,keywordInMessage+4,keywordInMessage+5,keywordInMessage+6)
                                //  messageFuture = objTime.message
                                //  millisecondsTime = objTime.millisecondsTime
                            }
                        }
                        else {
                            var time = parseInt(words[keywordInMessage + 3]); //время с типом число
                            if (isNaN(time) == true) {
                                bot.sendMessage(chatId, 'Ошибка! Неизвестно время - исправьте ошибку');
                            }
                            else if (time > 24) {
                                bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                            }
                            else {
                                var futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(words[keywordInMessage + 4], time);
                                var futureDateAndTime = new Date(futureMs);
                                millisecondsTime = futureDateAndTime.getTime() - date.getTime();
                                messageFuture = words.slice((keywordInMessage + 5), words.length).join(' '); //сообщение, которое напоминаем
                            }
                        }
                    }
                    else {
                    }
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                    CalculationOfFutureDateAndTime(millisecondsTime); /*дата в которую напоминаем сообщение*/
                }
            }
        }
        else if ((words.includes('сегодня') == true) || (words.includes('завтра') == true)
            || (words.includes('послезавтра') == true) || (words.includes('послепослезавтра') == true)) {
        }
        else {
            bot.sendMessage(chatId, 'Ошибка! Не корректный ввод. Символы неизвестны!');
        }
    }
    // bot.sendMessage(chatId,'Привет');
});
//# sourceMappingURL=index.js.map