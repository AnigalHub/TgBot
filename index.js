"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("./config.json"));
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var ConvertTime_1 = __importDefault(require("./ConvertTime"));
var DayOfTheWeek_1 = __importDefault(require("./DayOfTheWeek"));
var DateAsString_1 = require("./helper_functions/DateAsString");
var token = config_json_1.default.token;
var bot = new node_telegram_bot_api_1.default(token, { polling: true, baseApiUrl: "https://api.telegram.org" });
var convertTime = new ConvertTime_1.default();
//функция добавления времени, когда известен день
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
//функция удаления пустых элементов из массива
function RemoveEmptyElementsFromArray(array) {
    var output = [];
    if ((array === null || array === void 0 ? void 0 : array.includes('')) == true) {
        output = array === null || array === void 0 ? void 0 : array.filter(function (el) {
            return (el != "");
        });
    }
    return output;
}
//дата в данную минуту
var date = new Date();
console.log(date.toString()); //день недели | дата | время
bot.on('message', function (msg) {
    var chatId = msg.chat.id; //id пользователя
    var timeMessage = msg.date; //дата в сек отправки сообщения, которое напоминаем
    var c = new Date(timeMessage * 1000);
    console.log('дата сообщения', c.toString()); //дата и время, когда отправили сообщение, которое напомнить в виде строки
    var text = msg.text;
    if (!text) {
        bot.sendMessage(chatId, "нет сообщения");
        return;
    }
    if (text != text.toLocaleLowerCase()) {
        text = text.toLocaleLowerCase();
    }
    var words = text.split(" "); //разбиение на элементы массива, "пробел"
    //if(words?.includes('') == true){
    //  words = words?.filter(function (el) {
    //   return (el != "");
    //  });
    // }
    console.log(words); //массив
    if (words)
        words = RemoveEmptyElementsFromArray(words);
    console.log(words); //массив
    var keywordInMessage; //ключевое слово в сообщении
    var secondKeywordInMessage = 0; //ключевое слово в сообщении
    var millisecondsTime = 0; //миллисекунды - через сколько надо прислать сообщение
    var messageFuture; //сообщение, которое напоминаем
    if (words != undefined) {
        if (words.includes('через') == true) {
            keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf('через'); // индекс ключевого слова в массиве
            var arrayElementAfterKeyword1 = words[keywordInMessage + 1]; // элемент массива после ключевого слова - первый
            var arrayElementAfterKeyword2 = words[keywordInMessage + 2]; // элемент массива после ключевого слова - второй
            var arrayElementAfterKeyword3 = words[keywordInMessage + 3]; // элемент массива после ключевого слова - третий
            var arrayElementAfterKeyword4 = words[keywordInMessage + 4]; // элемент массива после ключевого слова - четвертый
            if (/^[0-9]*$/.test(arrayElementAfterKeyword1) == true) { // только цифры
                var time = parseInt(arrayElementAfterKeyword1); // время с типом число
                messageFuture = words.slice((keywordInMessage + 3), words.length).join(' '); // сообщение, которое напоминаем
                millisecondsTime = convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, time); //миллисекунды - через сколько надо прислать сообщение
                if (time == 0) { // если время указано цифрой 0
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
                }
                else if (millisecondsTime == 0) { // если такого времени нет и произошла ошибка и вернулся 0
                    bot.sendMessage(chatId, 'Ошибка! Отсутствует или некорректно указана единица времени');
                }
                else {
                    AddTimeWhenDayIsKnown(chatId, words, secondKeywordInMessage, millisecondsTime, messageFuture); // функция добавления времени когда день известен
                }
            }
            else if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword1) == true) { // только буквы
                if (arrayElementAfterKeyword1 == 'ноль' || arrayElementAfterKeyword1 == 'нуль') { // если время указано ноль/нуль
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Напомнить невозможно - это прям сейчас!');
                }
                else if (convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword1, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3, 1) == 0 &&
                    convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4, 1) == 0) {
                    bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                }
                else {
                    var time = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterKeyword1, arrayElementAfterKeyword2);
                    var objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, timeMessage, timeMessage, words, keywordInMessage + 1, keywordInMessage + 2, keywordInMessage + 3, keywordInMessage + 4);
                    messageFuture = objTime.message;
                    millisecondsTime = objTime.millisecondsTime;
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
            var arrayElementAfterKeyword1 = words[keywordInMessage + 1]; // элемент массива после ключевого слова - первый
            var arrayElementAfterKeyword2 = words[keywordInMessage + 2]; // элемент массива после ключевого слова - второй
            var arrayElementAfterKeyword3 = words[keywordInMessage + 3]; // элемент массива после ключевого слова - третий
            var arrayElementAfterKeyword4 = words[keywordInMessage + 4]; // элемент массива после ключевого слова - четвертый
            var arrayElementAfterKeyword5 = words[keywordInMessage + 5]; // элемент массива после ключевого слова - пятый
            var arrayElementAfterKeyword6 = words[keywordInMessage + 6]; // элемент массива после ключевого слова - шестой
            if (/^[0-9]*$/.test(arrayElementAfterKeyword1) == true) { // только цифры
                var time = parseInt(arrayElementAfterKeyword1); //время с типом число
                if (time == 0) {
                    time = 24;
                }
                if (time > 24 && convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, 1) >= 3600000) {
                    bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                }
                else if (convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, time) == 0) { //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 минут | 9 часов');
                }
                else if (!arrayElementAfterKeyword3) {
                    bot.sendMessage(chatId, 'Ошибка! Не указана дата');
                }
                else {
                    if (/[А-яЁё]/.test(arrayElementAfterKeyword3) == true) { // только буквы
                        if ((arrayElementAfterKeyword3) == "в" || (arrayElementAfterKeyword3) == "во") {
                            var dayOfTheWeek = new DayOfTheWeek_1.default(arrayElementAfterKeyword4);
                            if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1) {
                                var differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek();
                                var futureDay = date.getDate() + differenceInDays;
                                var futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                                var futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword2, time);
                                var futureDateAndTime = new Date(futureMs);
                                millisecondsTime = futureDateAndTime.getTime() - date.getTime();
                                messageFuture = words.slice((keywordInMessage + 5), words.length).join(' '); //сообщение, которое напоминаем
                                setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                                (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                            }
                        }
                        else {
                            var futureDay = convertTime.ConvertWordIndicatorOfTimeToNumber(arrayElementAfterKeyword3);
                            if ((time < date.getHours()) && arrayElementAfterKeyword3 == 'сегодня') {
                                bot.sendMessage(chatId, 'Ошибка! Время указано которое уже прошло - напомнить невозможно');
                            }
                            else if (convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3, 1) >= 3600000) {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно введено время и дата - неизвестно когда напоминать');
                            }
                            else if (futureDay == -1) {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Время указано, а дата нет.');
                            }
                            else {
                                var futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                                millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage, futureDate.getHours(), time, words, keywordInMessage + 2);
                                messageFuture = words.slice((keywordInMessage + 4), words.length).join(' '); //сообщение, которое напоминаем
                                setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                                (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                            }
                        }
                    }
                    else if (/[А-яЁё]/.test(arrayElementAfterKeyword3) == false && (arrayElementAfterKeyword3.includes('.') == true ||
                        arrayElementAfterKeyword3.includes('-') == true || arrayElementAfterKeyword3.includes('/') == true)) {
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
                            millisecondsTime = convertTime.CountDifferenceInMillisecondsBetweenFutureAndCurrentDates(timeMessage, futureDate.getHours(), time, words, keywordInMessage + 2);
                            setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                            (0, DateAsString_1.DateAsString)(millisecondsTime, date);
                        }
                    }
                    else {
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | пт | субботу | 21.05.22 | 21-05-22 | 21/05/22 ');
                    }
                }
            }
            else if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword1) == true) { // только буквы
                var dayOfTheWeek = new DayOfTheWeek_1.default(arrayElementAfterKeyword1);
                if (dayOfTheWeek.SearchForTheDayNumberOfTheWeek() != -1) {
                    var differenceInDays = dayOfTheWeek.DiffDaysOfTheWeek();
                    var futureDay = date.getDate() + differenceInDays;
                    var futureDate = new Date(date.getFullYear(), date.getMonth(), futureDay);
                    if (arrayElementAfterKeyword2 == "в") {
                        if (/^[А-яЁё]*$/.test(arrayElementAfterKeyword3) == true) {
                            if (convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword3, 1) == 0 &&
                                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4, 1) == 0 &&
                                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword5, 1) == 0 &&
                                convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword6, 1) == 0) {
                                bot.sendMessage(chatId, 'Ошибка! Не указана единица времени');
                            }
                            else if (millisecondsTime < -1 || millisecondsTime == 0) {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно указано время');
                            }
                            else {
                                var time = convertTime.ConvertLargeNumberFromStringToNumber(arrayElementAfterKeyword3, arrayElementAfterKeyword4);
                                if (arrayElementAfterKeyword3 == 'ноль' || arrayElementAfterKeyword3 == 'нуль') {
                                    time = 24;
                                }
                                var objTime = convertTime.CountTimeAsStringInMillisecondsAndAssembleMessage(time, date.getHours(), futureDate.getHours(), words, keywordInMessage + 3, keywordInMessage + 4, keywordInMessage + 5, keywordInMessage + 6);
                                messageFuture = objTime.message;
                                millisecondsTime = objTime.millisecondsTime;
                            }
                        }
                        else {
                            var time = parseInt(arrayElementAfterKeyword3); //время с типом число
                            if (isNaN(time) == true) {
                                bot.sendMessage(chatId, 'Ошибка! Неизвестно время - исправьте ошибку');
                            }
                            else if (time > 24) {
                                bot.sendMessage(chatId, 'Ошибка! Время не может быть больше 24');
                            }
                            else {
                                var futureMs = futureDate.getTime() + convertTime.ConvertTimeToMilliseconds(arrayElementAfterKeyword4, time);
                                var futureDateAndTime = new Date(futureMs);
                                millisecondsTime = futureDateAndTime.getTime() - date.getTime();
                                messageFuture = words.slice((keywordInMessage + 5), words.length).join(' '); //сообщение, которое напоминаем
                            }
                        }
                    }
                    else {
                    }
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                    (0, DateAsString_1.DateAsString)(millisecondsTime, date);
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