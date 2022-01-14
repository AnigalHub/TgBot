"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_json_1 = __importDefault(require("./config.json"));
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var token = config_json_1.default.token;
var bot = new node_telegram_bot_api_1.default(token, { polling: true, baseApiUrl: "https://api.telegram.org" });
/*функция перевода времени в милисекунды*/
function ConvertingTimeToMilliseconds(chatId, word, timePhrase) {
    var ms;
    if (word == "секунд" || word == "секунды" || word == "секунду") {
        ms = timePhrase * 1000;
    }
    else if (word == "минут" || word == "минуты" || word == "минуту") {
        ms = timePhrase * 60 * 1000;
    }
    else if (word == "полчаса") {
        ms = timePhrase * 30 * 1000;
    }
    else if (word == "час" || word == "часа" || word == "часов") {
        ms = timePhrase * 3600000;
    }
    else if (word == "день" || word == "дня" || word == "дней" || word == "сутки" || word == "суток") {
        ms = timePhrase * 86400000;
    }
    else if (word == "неделю" || word == "недели" || word == "недель") {
        ms = timePhrase * 604800000;
    }
    else if (word == "месяц" || word == "месяца" || word == "месяцев") {
        ms = timePhrase * 2592000000.0000005;
    }
    else if (word == "полгода") {
        ms = timePhrase * 6 * 2592000000.0000005;
    }
    else if (word == "год" || word == "года" || word == "лет") {
        ms = timePhrase * 31536000000.428898;
    }
    else {
        ms = 0;
    }
    return ms;
}
/*функция разницы в днях между двумя датами*/
function diffDates(day_one, day_two) {
    return (day_one.getTime() - day_two.getTime()) / (60 * 60 * 24 * 1000);
}
/*функция поиска индекса (номера) дня недели*/
function SearchForTheDayNumberOfTheWeek(dayOfTheWeek) {
    var indexArray;
    var array;
    if (dayOfTheWeek == 'вс' || dayOfTheWeek == 'пн' || dayOfTheWeek == 'вт' || dayOfTheWeek == 'ср' || dayOfTheWeek == 'чт' || dayOfTheWeek == 'пт' || dayOfTheWeek == 'сб') {
        array = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'cб'];
    }
    else if (dayOfTheWeek == 'воскресенье' || dayOfTheWeek == 'понедельник' || dayOfTheWeek == 'вторник' || dayOfTheWeek == 'среда' || dayOfTheWeek == 'четверг' || dayOfTheWeek == 'пятница' || dayOfTheWeek == 'суббота') {
        array = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'cуббота'];
    }
    else if (dayOfTheWeek == 'воскресенье' || dayOfTheWeek == 'понедельник' || dayOfTheWeek == 'вторник' || dayOfTheWeek == 'среду' || dayOfTheWeek == 'четверг' || dayOfTheWeek == 'пятницу' || dayOfTheWeek == 'субботу') {
        array = ['воскресенье', 'понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'cубботу'];
    }
    else {
        array = [];
    }
    indexArray = array.indexOf(dayOfTheWeek);
    return indexArray;
}
/*дата в данную минуту*/
var date = new Date();
console.log(date.toString()); // день недели | дата | время
console.log(Date.parse(date.toString())); //в милисекундах
bot.on('message', function (msg) {
    var _a;
    var chatId = msg.chat.id; //id
    var words = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.split(" "); //разбиение на элементы массива, "пробел"
    console.log(words); //массив
    var keywordInMessage; //ключевое слово в сообщении
    var millisecondsTime; //миллисекунды - через сколько надо прислать сообщение
    var messageFuture; //сообщение, которое напоминаем
    if (words != undefined) {
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            if (word == "через") {
                keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf(word); //индекс ключевого слова в массиве
                if (/^[0-9]*$/.test(words[keywordInMessage + 1]) == true) { // только цифры
                    var time = parseInt(words[keywordInMessage + 1]); //время с типом число
                    millisecondsTime = ConvertingTimeToMilliseconds(chatId, words[keywordInMessage + 2], time); //миллисекунды - через сколько надо прислать сообщение
                    if (millisecondsTime == 0) {
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                    }
                    else {
                        messageFuture = words.slice((keywordInMessage + 3), words.length).join(' '); //сообщение, которое напоминаем
                        setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                        /**/
                        console.log(messageFuture);
                        var timeFuture = Date.parse(date.toString()) + millisecondsTime;
                        var d = new Date(timeFuture);
                        console.log(d.toString()); // точная дата ( день недели | дата | время)
                        /**/
                    }
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage + 1]) == true) { // только буквы
                    messageFuture = words.slice((keywordInMessage + 2), words.length).join(' '); //сообщение, которое напоминаем
                    console.log(messageFuture);
                    millisecondsTime = ConvertingTimeToMilliseconds(chatId, words[keywordInMessage + 1], 1);
                    setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); //функция со временем - когда напомнить + сообщение - что напоминаем
                    /**/
                    var timeFuture = Date.parse(date.toString()) + millisecondsTime;
                    var d = new Date(timeFuture);
                    console.log(d.toString()); // точная дата ( день недели | дата | время)
                    /**/
                }
                else {
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Ввод времени указывается днем (словом) или числом. Пример: неделю/месяц | 12 минут/3 дня ');
                }
                break;
            }
            else if (word == "в" || word == "во") {
                keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf(word); //индекс ключевого слова в массиве
                if (/^[0-9]*$/.test(words[keywordInMessage + 1]) == true) { // только цифры
                    var time = parseInt(words[keywordInMessage + 1]); //время с типом число
                    var timeDifference = 0;
                    if (ConvertingTimeToMilliseconds(chatId, words[keywordInMessage + 2], time) == 0) { //проверка, что функция перевода времени в миллисекунды не возвращает 0 (ошибку)
                        bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                    }
                    else {
                        messageFuture = words.slice((keywordInMessage + 4), words.length).join(' '); //сообщение, которое напоминаем
                        console.log(messageFuture);
                        if (/[А-яЁё]/.test(words[keywordInMessage + 3]) == true) { // только буквы
                            if (words[keywordInMessage + 3] == "сегодня") {
                                timeDifference = Math.abs(date.getHours() - time);
                            }
                            else if (words[keywordInMessage + 3] == "завтра") {
                                timeDifference = Math.abs(24 - date.getHours() + time);
                            }
                            else if (words[keywordInMessage + 3] == "послезавтра") {
                                timeDifference = Math.abs(24 * 2 - date.getHours() + time);
                            }
                            else if (words[keywordInMessage + 3] == "послепослезавтра") {
                                timeDifference = Math.abs(24 * 3 - date.getHours() + time);
                            }
                            else {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Время указано, а дата нет. ');
                                break;
                            }
                            millisecondsTime = ConvertingTimeToMilliseconds(chatId, words[keywordInMessage + 2], timeDifference);
                            setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                            console.log(messageFuture);
                            var timeFuture = Date.parse(date.toString()) + millisecondsTime;
                            var d = new Date(timeFuture);
                            console.log(d.toString());
                        }
                        else if (/[А-яЁё]/.test(words[keywordInMessage + 3]) == false && (words[keywordInMessage + 3].includes('.') == true || words[keywordInMessage + 3].includes('-') == true)) {
                            var differenceInDays = diffDates(new Date(parseInt(words[keywordInMessage + 3].substring(6, 12)), parseInt(words[keywordInMessage + 3].substring(3, 6)), parseInt(words[keywordInMessage + 3].substring(0, 2))), new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
                            if (words[keywordInMessage + 3][2] == words[keywordInMessage + 3][5] && (words[keywordInMessage + 3][2] == '.' || words[keywordInMessage + 3][2] == '-') && (words[keywordInMessage + 3][5] == '.' || words[keywordInMessage + 3][5] == '-')) {
                                var timeFuture = void 0;
                                timeDifference = Math.abs((date.getHours() - time));
                                if (date.getHours() > time) {
                                    millisecondsTime = ConvertingTimeToMilliseconds(chatId, "дней", differenceInDays) - ConvertingTimeToMilliseconds(chatId, words[keywordInMessage + 2], timeDifference);
                                }
                                else {
                                    millisecondsTime = ConvertingTimeToMilliseconds(chatId, "дней", differenceInDays) + ConvertingTimeToMilliseconds(chatId, words[keywordInMessage + 2], timeDifference);
                                }
                                timeFuture = Date.parse(date.toString()) + millisecondsTime;
                                setTimeout(function () { return bot.sendMessage(chatId, messageFuture); }, millisecondsTime); // функция со временем - когда напомнить + сообщение - что напоминаем
                                console.log(messageFuture);
                                var d = new Date(timeFuture);
                                console.log(d.toString());
                            }
                            else {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Опечатка в дате!');
                            }
                        }
                        else {
                            bot.sendMessage(chatId, 'Ошибка! Некорректно введена дата. Ввод времени указывается числом или словом. Пример: завтра | послезавтра | 21.01.22 | 21-01-22');
                        }
                    }
                }
                else if (/^[А-яЁё]*$/.test(words[keywordInMessage + 1]) == true) { // только буквы
                    var extraTime = void 0;
                    var millisecondsTime_1 = void 0;
                    if (SearchForTheDayNumberOfTheWeek(words[keywordInMessage + 1]) != -1) {
                        var time = Math.abs(date.getDay() - SearchForTheDayNumberOfTheWeek(words[keywordInMessage + 1]));
                        if (time == 0) {
                            time = 7;
                        }
                        if (words[keywordInMessage + 2] == "в") {
                            if (/^[А-яЁё]*$/.test(words[keywordInMessage + 3]) == true) {
                                bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
                                break;
                            }
                            else {
                                extraTime = Math.abs(date.getHours() - parseInt(words[keywordInMessage + 3])); //разница во времени текущим и указанным в определенный день недели
                                if (date.getHours() > parseInt(words[keywordInMessage + 3])) { //если текущий час больше времени указанного в день недели
                                    millisecondsTime_1 = ConvertingTimeToMilliseconds(chatId, "дней", time) - ConvertingTimeToMilliseconds(chatId, "часов", extraTime);
                                }
                                else {
                                    millisecondsTime_1 = ConvertingTimeToMilliseconds(chatId, "дней", time) + ConvertingTimeToMilliseconds(chatId, "часов", extraTime);
                                }
                            }
                        }
                        else {
                            millisecondsTime_1 = ConvertingTimeToMilliseconds(chatId, "дней", time);
                        }
                        var timeFuture = Date.parse(date.toString()) + millisecondsTime_1;
                        var d = new Date(timeFuture);
                        console.log(d.toString());
                        break;
                    }
                    else {
                        bot.sendMessage(chatId, 'Ошибка! Некорректное слово, может быть задан только день недели. Пример: ср | среда | среду');
                    }
                }
            }
            else {
            }
        }
    }
    bot.sendMessage(chatId, 'Привет');
});
//# sourceMappingURL=index.js.map