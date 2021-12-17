"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var token = '2090927002:AAH3QrKEi3mj10s2Kw2_lF00VZcXq98Y-zQ';
var bot = new node_telegram_bot_api_1.default(token, { polling: true, baseApiUrl: "https://api.telegram.org" });
bot;
bot.on('message', function (msg) {
    var _a;
    var chatId = msg.chat.id; //id
    var words = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.split(" "); //разбиение на элементы массива, "пробел"
    console.log(words); //массив
    /*функция на вывод сообщения, которое напоминаем*/
    function sayHi(textMessage) {
        bot.sendMessage(chatId, textMessage);
    }
    /*функция перевода времени в милисекунды*/
    function ConvertingTimeToMilliseconds(word, timePhrase) {
        var ms;
        if (word == "секунд" || word == "секунды" || word == "секунду") {
            ms = timePhrase * 1000;
        }
        else if (word == "минут" || word == "минуты" || word == "минуту") {
            ms = timePhrase * 60 * 1000;
        }
        else if (word == "час" || word == "часа" || word == "часов") {
            ms = timePhrase * 3600000;
        }
        else if (word == "день" || word == "дня" || word == "дней") {
            ms = timePhrase * 86400000;
        }
        else if (word == "неделю" || word == "недели" || word == "недель") {
            ms = timePhrase * 604800000;
        }
        else if (word == "месяц" || word == "месяца" || word == "месяцев") {
            ms = timePhrase * 2592000000.0000005;
        }
        else if (word == "год" || word == "года" || word == "лет") {
            ms = timePhrase * 31536000000.428898;
        }
        else {
            bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Пример: 10 сек | 15 секунд | 1 секунду | 3 секунды');
            ms = 0;
        }
        return ms;
    }
    /*дата в данную минуту*/
    var date = new Date();
    console.log(date.toString()); // день недели | дата | время
    console.log(Date.parse(date.toString())); //в милисекундах
    /*проверка на undefined - слово, которое ищем и сам массив*/
    var keywordInMessage; //ключевое слово в сообщении
    var day_1 = new Date(2021, 12, 22);
    var day_2 = new Date(2021, 12, 17);
    function diffDates(day_one, day_two) {
        return (day_one - day_two) / (60 * 60 * 24 * 1000);
    }
    ;
    if (words != undefined) {
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            if (word == "через") {
                keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf(word); //индекс ключевого слова в массиве
                var time = parseInt(words[keywordInMessage + 1]); //время с типом число
                console.log(time);
                if (isNaN(time) == false && ConvertingTimeToMilliseconds(words[keywordInMessage + 2], time) != 0) {
                    var timeFuture = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordInMessage + 2], time);
                    var d = new Date(timeFuture);
                    console.log(d.toString()); // точная дата ( день недели | дата | время)
                    var messageFuture = words.slice((keywordInMessage + 3), words.length).join(' '); //фраза, которую напоминаем
                    console.log(messageFuture);
                    setTimeout(sayHi, ConvertingTimeToMilliseconds(words[keywordInMessage + 2], time), messageFuture); // функция со временем - когда напомнить + фраза - что напоминаем
                }
                else {
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Ввод времени указывается числом. Пример: 12 минут | 1 час ');
                }
            }
            else if (word == "в") {
                keywordInMessage = words === null || words === void 0 ? void 0 : words.indexOf(word); //индекс ключевого слова в массиве
                var time = parseInt(words[keywordInMessage + 1]); //время с типом число
                if (isNaN(time) == false && ConvertingTimeToMilliseconds(words[keywordInMessage + 2], time) != 0) {
                    /*if(time > date.getHours()){
                        let timeDifference = time - date.getHours()
                        console.log(timeDifference)
                        console.log(ConvertingTimeToMilliseconds(words[keywordInMessage+2],timeDifference))
                        let s = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordInMessage+2],timeDifference)
                        const d = new Date (s)
                        console.log(d.toString())
                    }
                    else{
                        let timeDifference = 24 - date.getHours() + time
                        console.log(timeDifference)
                        console.log(ConvertingTimeToMilliseconds(words[keywordInMessage+2],timeDifference))
                        let s = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordInMessage+2],timeDifference)
                        const d = new Date (s)
                        console.log(d.toString())

                    } */
                    if (words[keywordInMessage + 3] == "завтра") {
                        var timeDifference = Math.abs(24 - date.getHours() + time);
                        console.log(timeDifference);
                        console.log(ConvertingTimeToMilliseconds(words[keywordInMessage + 2], timeDifference));
                        var s = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordInMessage + 2], timeDifference);
                        var d = new Date(s);
                        console.log(d.toString());
                    }
                    else if (words[keywordInMessage + 3] == "послезавтра") {
                        var timeDifference = Math.abs(24 * 2 - date.getHours() + time);
                        console.log(timeDifference);
                        console.log(ConvertingTimeToMilliseconds(words[keywordInMessage + 2], timeDifference));
                        var s = Date.parse(date.toString()) + ConvertingTimeToMilliseconds(words[keywordInMessage + 2], timeDifference);
                        var d = new Date(s);
                        console.log(d.toString());
                    }
                    else if (words[keywordInMessage + 3].includes('.') == true || words[keywordInMessage + 3].includes('-') == true || words[keywordInMessage + 3] == "послезавтра") {
                        var r = diffDates(new Date(parseInt(words[keywordInMessage + 3].substring(6, 12)), parseInt(words[keywordInMessage + 3].substring(3, 6)), parseInt(words[keywordInMessage + 3].substring(0, 2))), new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
                        var a = void 0;
                        if (date.getHours() > time) {
                            a = Date.parse(date.toString()) + ConvertingTimeToMilliseconds("дней", r) -
                                ConvertingTimeToMilliseconds(words[keywordInMessage + 2], Math.abs((date.getHours() - time)));
                        }
                        else {
                            a = Date.parse(date.toString()) + ConvertingTimeToMilliseconds("дней", r) +
                                ConvertingTimeToMilliseconds(words[keywordInMessage + 2], Math.abs((date.getHours() - time)));
                        }
                        var d = new Date(a);
                        console.log(d.toString());
                    }
                    else {
                    }
                    var messageFuture = words.slice((keywordInMessage + 4), words.length).join(' ');
                    console.log(messageFuture);
                }
                else {
                    bot.sendMessage(chatId, 'Ошибка! Некорректно введено время. Ввод времени указывается числом. Пример: 12 минут | 1 час ');
                }
            }
        }
    }
    bot.sendMessage(chatId, 'Привет');
});
//# sourceMappingURL=index.js.map