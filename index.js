"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var token = '2090927002:AAGLOKpbLKvMqoveWeGzdRqI3ttDK0-Qcms';
var bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot;
bot.on('message', function (msg) {
    var _a;
    var chatId = msg.chat.id; //id
    var words = (_a = msg.text) === null || _a === void 0 ? void 0 : _a.split(" "); //разбиение на элементы массива, "пробел"
    console.log(words); //массив
    var a = words === null || words === void 0 ? void 0 : words.indexOf('через'); //поиск в массиве (индекс)
    /*функция на вывод сообщения, которое напоминаем*/
    function sayHi(textMessage) {
        bot.sendMessage(chatId, textMessage);
    }
    function selectTime(word, phrase, timePhrase) {
        if (word == "минут" || word == "минуты" || word == "минуту") {
            console.log(timePhrase * 60 * 1000);
            setTimeout(sayHi, timePhrase * 60 * 1000, phrase);
        }
        else if (word == "час" || word == "часа" || word == "часов") {
            console.log(timePhrase * 3600 * 10000);
            setTimeout(sayHi, timePhrase * 3600 * 10000, phrase);
        }
        else if (word == "день" || word == "дня" || word == "дней") {
            console.log(timePhrase * 86400 * 1000);
            setTimeout(sayHi, timePhrase * 86400 * 1000, phrase);
        }
    }
    /*проверка на undefined - слово, которое ищем и сам массив*/
    if (a != undefined && words != undefined) {
        console.log(a); //индекс слова в массиве
        console.log(words[a + 1]); //время
        var time = parseInt(words[a + 1]);
        console.log(time); //время
        console.log(words[a + 2]);
        var messageFuture = words.slice((a + 3), words.length).join(' ');
        console.log(messageFuture);
        selectTime(words[a + 2], messageFuture, time);
    }
    bot.sendMessage(chatId, 'Привет');
});
//# sourceMappingURL=index.js.map